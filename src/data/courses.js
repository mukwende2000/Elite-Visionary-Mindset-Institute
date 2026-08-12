const courses = [
    {
        id: 1,
        title: "Certificate in Business Management (CBM)",
        shortTitle: "Business Management",
        category: "Business & Management",
        description:
            "Develop practical business management skills for leading teams, improving operations, and making effective business decisions.",
        duration: "12 Weeks",
        mode: "Online / Campus",
        credits: "30 Credits",
        fee: "$1,200",
        overview:
            "The Certificate in Business Management is a comprehensive programme designed for aspiring managers and entrepreneurs. It provides a robust foundation in core business disciplines including strategy, operations, finance, and human resources. Through case studies and practical projects, students will develop the analytical and decision-making skills necessary to thrive in competitive corporate landscapes.",
        requirements: [
            "High School Diploma or equivalent",
            "Minimum 1 year of professional work experience",
            "Proficiency in English (IELTS 6.0 or equivalent)",
        ],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBYorLf_6SfiK3x39QZEHWL38_PlBprdh6uzEqq_11NUOg7hwI91cAPdu5hs7dQc5QxIlj3dJwru5n8HTvrsqRf4nXhqNN9tIOzL6pAO13dfF4ihJZJ5IoTnaPBV2PzVppF1Br6G3-kQW8JGmBneqYCGXPnJ7XcTDHoXoh-mg_vvm2UI4iIZHzxPn5wT7BIaW80QaAT1WcEAUp9pTNulZ3GzS0V2rpdCL7qVuABjjmlWx9JFbQIc78",
    },

    {
        id: 2,
        title: "Certificate in Tourism & Hospitality Management",
        shortTitle: "Tourism & Hospitality Management",
        category: "Hospitality",
        description:
            "Build professional skills for the tourism and hospitality industry, with a focus on service, operations, and customer experience.",
        duration: "16 Weeks",
        mode: "Campus",
        credits: "30 Credits",
        fee: "$1,200",
        overview:
            "Master the operational and strategic aspects of global tourism and premium hospitality management.",
        requirements: [
            "High School Diploma or equivalent",
            "Minimum 1 year of professional work experience",
            "Proficiency in English",
        ],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDglTUIOvnJQFvBNeDL0nxO4uIFRJBn3w9r2ihdtNquiAOMYzMQIFti38HL3LRjak0et7AS--9EUts0BuXtKU7HG1UXBY6SGLMerHwKMkTgOvKn3fEyr_rMrzwXsCuIzhAJT4JUMf-80ZARdFbb-48UPaqGwC9rlVkKES8m5Vho5kD5iarL9GeYsr8mmml_IgiWoOkalgbhbcXCiKwDZaZ46z1gKkVxNO5lydev4_J0Q7Vb1w-EXdg",
    },

    {
        id: 3,
        title: "Certificate in Early Childhood Care & Education",
        shortTitle: "Early Childhood Care & Education",
        category: "Education",
        description:
            "Gain foundational knowledge and practical skills for supporting the development, care, and education of young children.",
        duration: "14 Weeks",
        mode: "Online",
        credits: "30 Credits",
        fee: "$1,200",
        overview:
            "Gain advanced pedagogical insights for nurturing and educating the next generation in diverse settings.",
        requirements: [
            "High School Diploma or equivalent",
            "Minimum 1 year of relevant experience",
            "Proficiency in English",
        ],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuABR_lfP4xZbTfQSiz1HEA_kXLZBaHgd4NWr_9K_aR7ZKTWnqkMbEaCqwX2r6XVL9yjwJkyoF464fFlTg22i_sj4i4xLCIb5GKvYCRfvp_mDy_x03gjArUyVhxBHm0GdzZSK7T--hwP-GBB2_yj5uE_eQVW92KSpvYb3C4lPPWBcf338HvGYlFmmwQLfm5YoPsOGSLo6i0lQIl0UPFF1hClF666QyOwfZIkcz9tx2Y0xUdEvSMaJAM",
    },

    {
        id: 4,
        title: "Certificate in Artificial Intelligence (AI) & Prompt Engineering",
        shortTitle: "AI & Prompt Engineering",
        category: "Technology",
        description:
            "Learn how to use artificial intelligence and effective prompt engineering techniques to improve productivity and drive innovation.",
        duration: "12 Weeks",
        mode: "Online",
        credits: "30 Credits",
        fee: "$1,200",
        overview:
            "Develop practical skills in artificial intelligence and prompt engineering, learning how to work effectively with modern AI tools, create useful prompts, automate workflows, and apply AI responsibly in professional environments.",
        requirements: [
            "High School Diploma or equivalent",
            "Basic computer literacy",
            "Proficiency in English",
        ],
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    },

    {
        id: 5,
        title: "Certificate in Digital Marketing & Social Media Management",
        shortTitle: "Digital Marketing & Social Media",
        category: "Marketing",
        description:
            "Develop practical digital marketing and social media skills for building brands, engaging audiences, and growing businesses online.",
        duration: "12 Weeks",
        mode: "Online",
        credits: "30 Credits",
        fee: "$1,200",
        overview:
            "Build practical digital marketing expertise across social media management, content strategy, audience engagement, digital campaigns, and online brand development.",
        requirements: [
            "High School Diploma or equivalent",
            "Basic computer literacy",
            "Proficiency in English",
        ],
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    },

    {
        id: 6,
        title: "Certificate in Leadership and Management",
        shortTitle: "Leadership & Management",
        category: "Business & Management",
        description:
            "Develop the leadership and management capabilities needed to guide teams, solve problems, and achieve organizational goals.",
        duration: "12 Weeks",
        mode: "Online / Campus",
        credits: "30 Credits",
        fee: "$1,200",
        overview:
            "Develop essential leadership and management capabilities for building effective teams, managing performance, solving organizational problems, and achieving strategic objectives.",
        requirements: [
            "High School Diploma or equivalent",
            "Minimum 1 year of professional experience",
            "Proficiency in English",
        ],
        image:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    },

    {
        id: 7,
        title: "Certificate in Public Speaking and Communication",
        shortTitle: "Public Speaking & Communication",
        category: "Communication",
        description:
            "Build confidence and effective communication skills for professional presentations, public speaking, and workplace communication.",
        duration: "8 Weeks",
        mode: "Online / Campus",
        credits: "20 Credits",
        fee: "$900",
        overview:
            "Build confidence, clarity, and professional communication skills for public speaking, presentations, meetings, interviews, and workplace interactions.",
        requirements: [
            "High School Diploma or equivalent",
            "Basic communication skills",
            "Proficiency in English",
        ],
        image:
            "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    },

    {
        id: 8,
        title: "Certificate in Personal Branding and Image Management",
        shortTitle: "Personal Branding & Image Management",
        category: "Professional Development",
        description:
            "Learn how to develop a strong personal brand and professional image that communicates confidence, credibility, and value.",
        duration: "8 Weeks",
        mode: "Online",
        credits: "20 Credits",
        fee: "$900",
        overview:
            "Learn how to intentionally develop and manage a professional personal brand and image that communicates confidence, credibility, authenticity, and value.",
        requirements: [
            "High School Diploma or equivalent",
            "Interest in professional development",
            "Proficiency in English",
        ],
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
    },

    {
        id: 9,
        title: "Certificate in Sales and Marketing",
        shortTitle: "Sales & Marketing",
        category: "Sales & Marketing",
        description:
            "Develop practical sales and marketing skills for identifying opportunities, engaging customers, and increasing business performance.",
        duration: "10 Weeks",
        mode: "Online / Campus",
        credits: "25 Credits",
        fee: "$1,000",
        overview:
            "Develop practical sales and marketing capabilities for identifying opportunities, understanding customers, building relationships, closing sales, and improving business performance.",
        requirements: [
            "High School Diploma or equivalent",
            "Basic business knowledge",
            "Proficiency in English",
        ],
        image:
            "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1000&q=80",
    },

    {
        id: 10,
        title: "Certificate in Entrepreneurship and Business Development",
        shortTitle: "Entrepreneurship & Business Development",
        category: "Entrepreneurship",
        description:
            "Develop entrepreneurial thinking and practical business development skills for starting, growing, and managing successful ventures.",
        duration: "12 Weeks",
        mode: "Online / Campus",
        credits: "30 Credits",
        fee: "$1,200",
        overview:
            "Develop entrepreneurial thinking and practical business development skills covering opportunity identification, business planning, customer development, financial fundamentals, and sustainable business growth.",
        requirements: [
            "High School Diploma or equivalent",
            "Interest in entrepreneurship or business",
            "Proficiency in English",
        ],
        image:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80",
    },
];

export default courses;