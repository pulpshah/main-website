/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";

export interface PageData {
  url: string;
  title: string;
  structuredText: Array<{
    text: string;
    path: string;
    links: Array<{ text: string; url: string }>;
    images: Array<{ src: string; alt: string; width: number; height: number }>;
    styledText?: string;
  }>;
  links: Array<{ text: string; url: string; path: string }>;
  buttons: Array<{ text: string; action: string; path: string }>;
  images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    path: string;
  }>;
}

const getElementPath = (element: HTMLElement): string => {
  const parts = [];
  while (element && element.tagName.toLowerCase() !== "html") {
    let tag = element.tagName.toLowerCase();
    if (element.id) {
      tag += `#${element.id}`;
    } else if (element.classList.length > 0) {
      const firstClass = Array.from(element.classList).find(
        (cls) => !cls.startsWith("__variable_")
      );
      if (firstClass) tag += `.${firstClass}`;
    }
    parts.unshift(tag);
    element = element.parentElement as HTMLElement;
  }
  return parts.join(" > ");
};

const isPartOfChatbot = (element: HTMLElement): boolean => {
  let currentElement: HTMLElement | null = element;
  while (currentElement && currentElement !== document.body) {
    const classNames = Array.from(currentElement.classList);
    if (
      classNames.some(
        (cls) =>
          cls.includes("chat") || cls.includes("message") || cls.includes("bot")
      ) ||
      currentElement.getAttribute("aria-label")?.includes("chat") ||
      currentElement.getAttribute("aria-label")?.includes("message") ||
      (window.getComputedStyle(currentElement).position === "fixed" &&
        (["24px", "6px"].includes(
          window.getComputedStyle(currentElement).bottom
        ) ||
          window.getComputedStyle(currentElement).right === "6px"))
    ) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }
  return false;
};

const dedupeBlocks = (
  blocks: PageData["structuredText"]
): PageData["structuredText"] => {
  const deduped: PageData["structuredText"] = [];

  blocks.forEach((block, i) => {
    const isChildOfExisting = blocks.some(
      (other, j) =>
        i !== j &&
        block.path.startsWith(other.path) &&
        block.text === other.text
    );
    if (!isChildOfExisting) deduped.push(block);
  });

  return deduped;
};

const mergeStyledText = (
  chunks: Array<{
    text: string;
    color: string;
    weight: string;
    decoration: string;
    style: string;
    section: string;
  }>
) => {
  const merged: typeof chunks = [];

  for (const chunk of chunks) {
    const last = merged[merged.length - 1];
    if (
      last &&
      last.color === chunk.color &&
      last.weight === chunk.weight &&
      last.decoration === chunk.decoration &&
      last.style === chunk.style &&
      last.section === chunk.section
    ) {
      last.text += " " + chunk.text;
    } else {
      merged.push({ ...chunk });
    }
  }

  return merged;
};

const serializeStyledText = (
  chunks: Array<{
    text: string;
    color: string;
    weight: string;
    decoration: string;
    style: string;
    section: string;
  }>
): string => {
  return chunks
    .map(({ text, color, weight, decoration, style, section }) => {
      const cleanText = text.replace(/\s+/g, " ").trim();
      return JSON.stringify({
        text: cleanText,
        color,
        weight,
        decoration,
        style,
        section,
      });
    })
    .join("\n");
};

export const usePageData = (options?: { debug?: boolean }) => {
  const [pageData, setPageData] = useState<PageData>({
    url: "",
    title: "",
    structuredText: [],
    links: [],
    buttons: [],
    images: [],
  });

  const updatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUrlRef = useRef<string>("");
  const lastContentSignatureRef = useRef<string>("");

  useEffect(() => {
    const getContentSignature = (): string => {
      const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
        .map((h) => h.textContent?.trim())
        .filter(Boolean)
        .join("|");

      const mainContent =
        document.querySelector("main")?.textContent?.trim() || "";

      return `${window.location.pathname}|${document.title}|${headings}|${mainContent.length}`;
    };

    const extractPageData = () => {
      if (updatingRef.current) return;
      updatingRef.current = true;

      try {
        const currentUrl = window.location.href;
        const currentContentSignature = getContentSignature();
        if (
          currentUrl === lastUrlRef.current &&
          currentContentSignature === lastContentSignatureRef.current
        ) {
          updatingRef.current = false;
          return;
        }

        lastUrlRef.current = currentUrl;
        lastContentSignatureRef.current = currentContentSignature;

        if (options?.debug) {
          console.log("Page change detected:", currentUrl);
        }

        const buttonTexts = new Set<string>();

        const buttons = Array.from(
          document.querySelectorAll(
            "button, input[type='submit'], [role='button']"
          )
        )
          .filter((button) => !isPartOfChatbot(button as HTMLElement))
          .map((button) => {
            const text = (
              (button as HTMLElement).innerText.trim() ||
              button.getAttribute("value") ||
              "No text"
            ).replace(/\s+/g, " ");
            buttonTexts.add(text);
            return {
              text,
              action: button.getAttribute("onclick") || "No direct action",
              path: getElementPath(button as HTMLElement),
            };
          })
          .filter((button) => button.text !== "No text");

        const candidates = Array.from(
          document.querySelectorAll(
            'section, article, div[class*="max-w"], div[class*="py-"], div[class*="space-y"]'
          )
        ).filter((el) => !isPartOfChatbot(el as HTMLElement));

        const structuredTextRaw = candidates
          .map((el) => {
            const textChunks: string[] = [];
            const links: Array<{ text: string; url: string }> = [];
            const images: Array<{
              src: string;
              alt: string;
              width: number;
              height: number;
            }> = [];

            const styledChunks: Array<{
              text: string;
              color: string;
              weight: string;
              decoration: string;
              style: string;
              section: string;
            }> = [];

            const traverse = (node: Element | ChildNode) => {
              if (
                node.nodeType === Node.TEXT_NODE &&
                node.textContent?.trim()
              ) {
                textChunks.push(node.textContent.trim());

                if (node.parentElement) {
                  const styles = window.getComputedStyle(node.parentElement);
                  const text = node.textContent.trim();

                  const isTransparent = (val: string) =>
                    val === "transparent" || val === "rgba(0, 0, 0, 0)";

                  let color = styles.color;

                  if (
                    isTransparent(styles.color) ||
                    isTransparent(styles.webkitTextFillColor || "")
                  ) {
                    const bgImage = styles.backgroundImage;
                    if (bgImage && bgImage.includes("gradient")) {
                      color = `gradient: ${bgImage}`;
                    }
                  }

                  const fontWeight = styles.fontWeight;
                  const textDecoration = styles.textDecoration;
                  const fontStyle = styles.fontStyle;

                  const getNearestSectionLabel = (node: Node): string => {
                    let el = node.parentElement;
                    while (el && el !== document.body) {
                      const label = el.getAttribute("data-section");
                      if (label) return label;
                      el = el.parentElement;
                    }
                    return "unknown";
                  };

                  const section = getNearestSectionLabel(node);

                  styledChunks.push({
                    text,
                    color,
                    weight: fontWeight,
                    decoration: textDecoration,
                    style: fontStyle,
                    section,
                  });
                }
              }

              if (node instanceof HTMLElement) {
                if (node.tagName === "A") {
                  const anchor = node as HTMLAnchorElement;
                  if (anchor.href) {
                    links.push({
                      text: anchor.innerText.trim(),
                      url: anchor.href,
                    });
                  }
                }

                if (node.tagName === "IMG") {
                  const img = node as HTMLImageElement;
                  images.push({
                    src: img.src,
                    alt: img.alt || "No alt text",
                    width: img.width,
                    height: img.height,
                  });
                }
                Array.from(node.childNodes).forEach(traverse);
              }
            };

            traverse(el);

            const text = textChunks.join("\n\n");

            if (text.length > 5000 && el.childElementCount > 5) return null;

            return {
              text,
              path: getElementPath(el as HTMLElement),
              links,
              images,
              styledText: serializeStyledText(mergeStyledText(styledChunks)),
            };
          })
          .filter(
            (block): block is Exclude<typeof block, null> =>
              !!block && block.text.length > 30
          );

        const structuredText = dedupeBlocks(structuredTextRaw);

        const links = Array.from(document.querySelectorAll("a[href]"))
          .filter((link) => !isPartOfChatbot(link as HTMLElement))
          .map((link) => ({
            text: (link as HTMLElement).innerText.trim(),
            url: (link as HTMLAnchorElement).href,
            path: getElementPath(link as HTMLElement),
          }))
          .filter((link) => link.text);

        const images = Array.from(document.querySelectorAll("img"))
          .filter((img) => !isPartOfChatbot(img as HTMLElement))
          .map((img) => {
            const image = img as HTMLImageElement;
            return {
              src: image.src,
              alt: image.alt || "No alt text",
              width: image.width,
              height: image.height,
              path: getElementPath(image),
            };
          });

        setPageData({
          url: window.location.href,
          title: document.title,
          structuredText,
          links,
          buttons,
          images,
        });

        if (options?.debug) {
          console.log("Updated Page Data:", {
            url: currentUrl,
            title: document.title,
            textCount: structuredText.length,
            linksCount: links.length,
            buttonsCount: buttons.length,
            imagesCount: images.length,
          });
        }
      } catch (error) {
        console.error("Error extracting page data:", error);
      } finally {
        updatingRef.current = false;
      }
    };

    extractPageData();

    const observer = new MutationObserver(() => extractPageData());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["style", "class", "hidden"],
    });

    const handleUrlChange = () => {
      if (lastUrlRef.current !== window.location.href) extractPageData();
    };

    const handleScroll = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(extractPageData, 500);
    };

    const handlePopState = () => extractPageData();
    const handleHistoryChange = () => setTimeout(handleUrlChange, 0);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    history.pushState = function () {
      originalPushState.apply(this, arguments as any);
      handleHistoryChange();
    };
    history.replaceState = function () {
      originalReplaceState.apply(this, arguments as any);
      handleHistoryChange();
    };

    const urlCheckInterval = setInterval(handleUrlChange, 1000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleUrlChange);
    document.addEventListener("click", (event) => {
      const link = (event.target as HTMLElement).closest("a");
      if (link && link.getAttribute("href")) setTimeout(handleUrlChange, 100);
    });

    return () => {
      observer.disconnect();

      clearInterval(urlCheckInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleUrlChange);
      document.removeEventListener("click", handleUrlChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [options?.debug]);

  return pageData;
};
