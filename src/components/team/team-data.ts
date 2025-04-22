export interface TeamMember {
  id: string
  name: string
  position?: string
  photoUrl: string
  bio: string
  category: 'leadership' | 'team' | 'board' | 'advisors'
}

// Placeholder for photos - these will be replaced with actual photos
const PHOTO_PLACEHOLDER = "/placeholder-profile.jpg"

export const teamMembers: TeamMember[] = [
  // Leadership
  {
    id: "shah-ullah",
    name: "Shah Ullah",
    position: "Founder & CEO",
    photoUrl: "/team/Shah_Ullah.jpeg",
    bio: "Shah is a strategist and entrepreneur with deep expertise in AI, speech recognition, and data-driven engagement. Before founding Pulp, he led partnerships at Treedom and worked across a range of AI and media-tech startups, gaining a sharp understanding of how technology shapes the way we communicate. With a background in competitive debate and startup execution, he brings a rare blend of human insight and technical acumen to the table, bridging the gap between machine learning and meaningful conversation.\n\nAt Pulp, Shah's leadership is focused on building AI tools that elevate critical thinking and engagement. His work in persuasion modeling and workflow automation powers the platform's ability to personalize and optimize interactions. From securing early-stage funding to developing advanced AI solutions, he ensures Pulp remains at the forefront of language-driven innovation. A former Junior Olympic fencer turned state debate champion, Shah channels the same strategic mindset into building a company that helps people think clearly, communicate effectively, and make informed decisions.",
    category: "leadership"
  },
  {
    id: "bea-dimaculangan",
    name: "Bea Dimaculangan",
    position: "Co-Founder & COO",
    photoUrl: "/team/Bea_Dimaculangan.jpeg",
    bio: "Bea Dimaculangan is the Chief Operating Officer at Pulp, bringing a wealth of entrepreneurial experience and operational expertise to the team. With a background in co-founding and managing early-stage companies across creative industries, she has played a pivotal role in structuring business operations from the ground up. As co-owner of Darkside Industries, Bea has built a thriving multimedia production studio that has engaged hundreds of artists through professional services and event programming. Her ability to scale creative ventures, design efficient workflows, and execute complex projects positions her as a key driver of Pulp's strategic and operational success.\n\nAt Pulp, Bea ensures that high-level vision translates into actionable execution. With a deep understanding of startup operations, she structures processes to keep projects aligned, streamlined, and scalable. Her experience in managing multidisciplinary teams, developing educational initiatives, and pioneering tech-driven events, such as the world's first Music & Tech Summit in the Metaverse, demonstrates her ability to navigate the intersection of technology, strategy, and creative industries. Bea's leadership ensures that Pulp's operations remain agile, efficient, and positioned for long-term impact.",
    category: "leadership"
  },
  
  // Team
  {
    id: "uday-turakhia",
    name: "Uday Turakhia",
    position: "Chief Technology Officer",
    photoUrl: "/team/Uday_Turakhia.jpeg",
    bio: "As the Chief Technology Officer at Pulp, Uday Turakhia plays a pivotal role in shaping the company's AI-driven infrastructure. With a deep background in AI research, data engineering, and full-stack development, Uday has been instrumental in building the core technological foundation that powers Pulp's platform. His expertise spans large-scale knowledge retrieval, metadata enrichment, and AI-powered automation: key components that define Pulp's cutting-edge capabilities. From developing scalable LLM-powered chatbots to optimizing RAG-based search systems, he has not only driven technical innovation but also ensured that Pulp's AI solutions are efficient, scalable, and adaptable across various industries.\n\nUday's technical leadership is rooted in his ability to bridge research with real-world AI applications. His background in structured argumentation, AI-driven reasoning, and high-performance cloud infrastructure allows him to develop intelligent, responsive, and robust systems. By implementing serverless architectures, refining API performance, and integrating advanced knowledge graph techniques, he has significantly enhanced the efficiency of Pulp's AI models. His experience leading multi-faceted development efforts, combined with his commitment to pushing the boundaries of AI and data-driven decision-making, makes him an invaluable leader in Pulp's mission to revolutionize AI-powered engagement and automation.",
    category: "team"
  },
  {
    id: "robin-isenstadt",
    name: "Robin Isenstadt",
    position: "VP of Student Apprenticeships",
    photoUrl: "/team/Robin_Isenstadt.jpeg",
    bio: "Robin leads Pulp's student apprenticeship program, ensuring that students gain hands-on experience in AI, technology, and business while preparing for their future careers. She designs and oversees initiatives that connect students with real-world projects, matching them to the right opportunities based on their skills and career goals. Her expertise in workforce development ensures that apprentices at Pulp are not only learning but also making meaningful contributions to the company.\n\nWith a background in nonprofit leadership and youth career programs, Robin understands how to build scalable, impactful apprenticeship programs. She has successfully launched and managed workforce initiatives in New York City, helping students transition from education to employment. Her passion for mentorship and program design ensures that Pulp's apprenticeship program is structured for success, benefiting both the students and the company.",
    category: "team"
  },
  {
    id: "hannah-peyton",
    name: "Hannah Peyton",
    position: "VP of Business Development",
    photoUrl: "/team/Hannah_Peyton.jpeg",
    bio: "Hannah is an experienced government affairs professional with deep experience in federal policy, civic engagement, and political strategy. She served as a presidential appointee in the Biden Administration for three years, most recently as Deputy White House Liaison at the U.S. Department of Agriculture. There, she helped coordinate agency leadership and advised on the USDA's historic $19.5 billion investment in climate-smart agriculture and carbon capture. With nine years of campaign experience, including national field operations for Biden for President, she brings a sharp understanding of political communications, stakeholder engagement, and public affairs. Her strong relationships in D.C. and with elected officials nationwide make her a trusted connector between technology and government.\n\nAt Pulp, Hannah drives strategic partnerships and business development, leveraging her deep government experience to build relationships across public and private sectors. She identifies and cultivates opportunities for growth while ensuring Pulp's AI solutions meet the complex needs of enterprise clients, from federal agencies to Fortune 500 companies. Her strong network and understanding of institutional decision-making help position Pulp as a trusted partner in digital transformation.",
    category: "team"
  },
  {
    id: "damani-thomas",
    name: "Damani Thomas",
    position: "VP of Natural Language Understanding (NLU)",
    photoUrl: "/team/Damani_Thomas.jpeg",
    bio: "Damani plays a critical role in shaping Pulp's natural language understanding capabilities, ensuring that our AI models can analyze, interpret, and respond to human language with precision. His expertise in data processing and AI pipeline development allows Pulp to extract meaningful insights from text, forming the foundation of our rhetorical scoring system. Pragmatic and results-driven, he focuses on building functional, scalable solutions that enhance Pulp's AI-powered analysis.\n\nOne of Damani's most significant contributions to Pulp has been the development of PulPy, the Python library that powers our rhetorical scoring systems. As the main maintainer of its codebase, he has designed and optimized key functions that allow Pulp to break down user input, analyze argument structures, and provide meaningful AI-driven insights. His work is instrumental in making Pulp's AI more intelligent and adaptable.",
    category: "team"
  },
  {
    id: "devon-smith",
    name: "Devon Smith",
    position: "Head of Strategic Communications",
    photoUrl: "/team/Devon_Smith.jpeg",
    bio: "Devon Smith is a seasoned strategist with expertise in growth, communication, and innovation. With over eight years of experience driving engagement, audience growth, and revenue for top brands, he has worked with organizations such as T-Mobile, Mercedes-Benz, UnitedMasters, and Ad Age. His work has led to over $5M in revenue, 150K+ new customer leads, and 250K+ event and content subscriptions. Devon specializes in developing high-impact messaging frameworks, content ecosystems, and business strategies that bridge the gap between marketing, education, and social impact.\n\nAt Pulp, Devon spearheads strategic communications, ensuring our marketing efforts are deeply aligned with business development and our AI-driven workflows. His expertise in audience engagement and messaging strategy allows him to shape how Pulp communicates its value across industries, from enterprise clients to developers and researchers. He brings a unique ability to craft narratives that drive adoption and trust while optimizing automated workflows that enhance customer experiences.",
    category: "team"
  },
  {
    id: "nafiz-mannan",
    name: "Nafiz Mannan",
    position: "VP of UX Research",
    photoUrl: "/team/Nafiz_Mannan.jpeg",
    bio: "Nafiz Mannan is a seasoned UX researcher, product designer, and entrepreneur with a deep passion for the intersection of music and technology. As the founder and CEO of Melabel, he has developed a platform that empowers artists with the tools and insights they need to navigate the evolving digital music landscape. With over 15 years of experience in UX design, he has worked on 100+ projects, spanning AI-driven interfaces, workflow automation, and media engagement strategies. His tenure as Senior UX Designer at Nielsen further solidified his expertise in data visualization, design thinking, and strategic user experience research.\n\nAt Pulp, Nafiz applies his extensive experience to shaping intuitive and impactful AI-driven user experiences. His deep understanding of how technology influences engagement allows him to create research-driven UX strategies that enhance Pulp's platform. By blending AI, user psychology, and strategic design, he ensures Pulp delivers seamless, data-informed experiences that optimize decision-making and communication. His ability to bridge the gap between technology, creativity, and business makes him an invaluable leader in building AI solutions that empower users to interact more effectively with language and media.",
    category: "team"
  },
  
  // Board of Directors
  {
    id: "jeff-harris",
    name: "Jeff Harris",
    position: "",
    photoUrl: "/team/Jeff_Harris.jpeg",
    bio: "Jeff is a seasoned nonprofit leader with a track record of building mission-driven partnerships that drive impact. As the former CEO of the Junior Statesmen Foundation (JSA), he expanded civic education programs, secured major funding, and strengthened the organization's strategic vision. His experience also includes leading school-community partnerships for Compton Unified School District, where he developed alliances with corporate and nonprofit stakeholders to support educational equity. Currently, he serves on the Board of Directors for the Golden Globe Foundation, playing a key role in governance reform and grant initiatives.\n\nAt Pulp, Jeff applies his expertise in alliance-building to expand partnerships that amplify the reach and application of AI in education, civic engagement, and beyond. His background in speech, debate, and strategic fundraising makes him uniquely positioned to connect Pulp with organizations that benefit from persuasive AI technology. A firm believer in equity and access, Jeff's work continues to be driven by the power of education to transform lives.",
    category: "board"
  },
  {
    id: "pat-arcadipane",
    name: "Pat Arcadipane",
    position: "",
    photoUrl: "/team/Pat_Arcadipane.jpeg",
    bio: "Pat ensures the company's financial health by overseeing budgeting, forecasting, and strategic investment planning. With decades of experience helping startups and established companies structure their finances for growth, he provides the financial strategy and operational oversight needed to scale Pulp sustainably. His expertise in cash flow management, capital allocation, and financial modeling ensures that Pulp's resources are optimized for long-term success.\n\nPat's track record of securing investment, structuring deals, and leading financial turnarounds makes him a critical asset to Pulp's leadership team. Whether it's refining revenue models, securing funding opportunities, or ensuring compliance, his financial acumen helps drive Pulp's expansion. His ability to translate complex financial strategies into actionable insights empowers Pulp to make data-driven decisions while maintaining financial stability in a rapidly evolving AI landscape.",
    category: "board"
  },
  {
    id: "jeff-adams",
    name: "Jeff Adams",
    position: "",
    photoUrl: "/team/Jeff_Adams.jpeg",
    bio: "Jeff brings world-class expertise in AI-driven speech and language systems to Pulp. As the architect behind Alexa's voice technology and an innovator in conversational AI, he ensures that Pulp's research and development efforts push the boundaries of what's possible in natural language processing. His leadership in AI research directly contributes to making Pulp's models more adaptive, responsive, and capable of understanding nuanced human communication.\n\nWith a track record of building industry-defining voice AI solutions, Jeff is instrumental in shaping Pulp's approach to speech recognition, persuasion modeling, and personalized AI experiences. His deep technical knowledge and ability to bridge research with real-world applications make him a cornerstone of Pulp's mission to revolutionize AI-driven engagement.\n\nFun fact: Jeff has been working on speech and language AI for so long that he remembers when voice assistants were just science fiction!",
    category: "board"
  },
  {
    id: "ismael-larrosa",
    name: "Ismael Larrosa",
    position: "",
    photoUrl: "/team/Ismael_Larrosa.jpeg",
    bio: "Ismael brings a wealth of experience in turning visionary ideas into structured, scalable, and user-driven digital products. Having worked across the full spectrum of product development, from early-stage startups to enterprise solutions, he ensures that Pulp's AI-driven platform evolves with a strong foundation in UX, strategy, and technical execution. His ability to bridge creativity with data-driven decision-making helps translate ambitious concepts into tangible, high-impact solutions.\n\nHis leadership in managing cross-functional teams at Capicua, coupled with his track record of delivering award-winning software solutions, makes him instrumental in shaping Pulp's product roadmap. By integrating best practices in product development, growth strategy, and operational efficiency, he ensures that Pulp remains at the forefront of AI innovation. Whether it's refining user experience, optimizing workflows, or scaling technical infrastructure, Ismael's strategic vision and execution play a pivotal role in bringing Pulp's mission to life.",
    category: "board"
  },
  
  // Advisors
  {
    id: "kamy-akhavan",
    name: "Kamy Akhavan",
    position: "Managing Director at USC Center for the Political Future",
    photoUrl: PHOTO_PLACEHOLDER,
    bio: "As Managing Director at USC Center for the Political Future, Kamy brings extensive experience in civic leadership and political discourse. His expertise in fostering meaningful dialogue and engagement helps shape Pulp's approach to communication technology.",
    category: "advisors"
  },
  {
    id: "toby-chaudhury",
    name: "Toby Chaudhury",
    position: "",
    photoUrl: PHOTO_PLACEHOLDER,
    bio: "Through his leadership at SocialxDesign, Toby has driven innovation in social impact and strategic communications for major institutions. His experience with high-profile clients like The White House and PBS informs Pulp's engagement strategies.",
    category: "advisors"
  },
  {
    id: "dr-david-edelsohn",
    name: "Dr. David Edelsohn",
    position: "",
    photoUrl: PHOTO_PLACEHOLDER,
    bio: "With over three decades in high-performance computing and AI systems, David brings crucial technical expertise to Pulp. As Alliances Manager at NVIDIA, he helps ensure our AI infrastructure remains cutting-edge and scalable.",
    category: "advisors"
  },
  {
    id: "terrance-pender",
    name: "Terrance Pender",
    position: "",
    photoUrl: PHOTO_PLACEHOLDER,
    bio: "Terrance's extensive background in audio engineering and creative direction, combined with his project management experience at organizations like the UN and Viacom, brings valuable insights to Pulp's content and engagement strategies.",
    category: "advisors"
  }
]; 