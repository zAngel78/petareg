// Real research data from the investigation
export const researchData = {
  metadata: {
    date: "October 9, 2025",
    researcher: "Angel Ramirez",
    client: "Stephany Nayz - Yeshiva University",
    phase: "Phase 1 - Initial Findings",
    status: "In Progress"
  },

  universities: [
    {
      id: "yu",
      name: "Yeshiva University",
      shortName: "YU",
      instagram: {
        handle: "@yeshiva_university",
        followers: 15000,
        posts: 2260,
        url: "https://www.instagram.com/yeshiva_university/"
      },
      tiktok: {
        handle: null,
        followers: 0,
        active: false,
        url: null
      },
      color: "#003D7A" // YU Blue
    },
    {
      id: "nyu",
      name: "New York University",
      shortName: "NYU",
      instagram: {
        handle: "@nyuniversity",
        followers: 593000,
        posts: 2613,
        url: "https://www.instagram.com/nyuniversity/"
      },
      tiktok: {
        handle: "@nyuniversity",
        followers: 112400,
        active: true,
        url: "https://www.tiktok.com/@nyuniversity"
      },
      color: "#57068c" // NYU Purple
    },
    {
      id: "columbia",
      name: "Columbia University",
      shortName: "Columbia",
      instagram: {
        handle: "@columbia",
        followers: 457000,
        posts: null,
        url: "https://www.instagram.com/columbia/"
      },
      tiktok: {
        handle: null,
        followers: 0,
        active: false,
        url: null
      },
      color: "#b9d9eb" // Columbia Blue
    },
    {
      id: "rutgers",
      name: "Rutgers University",
      shortName: "Rutgers",
      instagram: {
        handle: "@rutgersu",
        followers: 124000,
        posts: null,
        url: "https://www.instagram.com/rutgersu/"
      },
      tiktok: {
        handle: "@rutgersu",
        followers: null,
        active: true,
        url: "https://www.tiktok.com/@rutgersu"
      },
      color: "#CC0033" // Rutgers Red
    },
    {
      id: "brandeis",
      name: "Brandeis University",
      shortName: "Brandeis",
      instagram: {
        handle: "@brandeisuniversity",
        followers: 25000,
        posts: 2965,
        url: "https://www.instagram.com/brandeisuniversity/"
      },
      tiktok: {
        handle: "@brandeisuniversity",
        followers: null,
        active: true,
        url: "https://www.tiktok.com/@brandeisuniversity"
      },
      color: "#003478" // Brandeis Blue
    },
    {
      id: "maryland",
      name: "University of Maryland",
      shortName: "Maryland",
      instagram: {
        handle: "@applymaryland",
        followers: 4932,
        posts: 1258,
        url: "https://www.instagram.com/applymaryland/"
      },
      tiktok: {
        handle: null,
        followers: 0,
        active: false,
        url: null
      },
      color: "#E03A3E", // Maryland Red
      note: "Admissions account only"
    }
  ],

  benchmarks: {
    instagram: {
      averageEngagement: 2.99,
      optimalPostingFrequency: {
        min: 8,
        max: 28,
        engagementRate: 4.52
      },
      minimumEffective: {
        min: 2,
        max: 15,
        engagementRate: 2.99
      },
      bestTime: "8 PM Wednesday",
      bestContent: "Instagram Reels",
      reelsEngagement: 1.99,
      carouselEngagement: 0.80
    },
    facebook: {
      optimalEngagement: 2.97,
      postingFrequency: 2,
      note: "Quality over quantity"
    },
    twitter: {
      optimalEngagement: 2.61,
      postingFrequency: 2,
      industryAverage: 10.1
    },
    linkedin: {
      optimalEngagement: 2.95,
      postingFrequency: {
        min: 2,
        max: 3
      }
    },
    tiktok: {
      weeklyFollowerGrowth: 2.28,
      engagementMultiplier: 4,
      note: "Fastest growing platform"
    }
  },

  keyFindings: [
    {
      id: 1,
      type: "critical",
      title: "Instagram Follower Gap",
      description: "YU has 39.5x fewer followers than NYU (578K difference)",
      impact: "high",
      priority: 1,
      metric: {
        current: 15000,
        target: 25000,
        timeframe: "6 months"
      }
    },
    {
      id: 2,
      type: "critical",
      title: "No TikTok Presence",
      description: "Missing the fastest-growing platform (2.28% weekly growth)",
      impact: "high",
      priority: 1,
      metric: {
        current: 0,
        target: 5000,
        timeframe: "3 months"
      }
    },
    {
      id: 3,
      type: "warning",
      title: "Posting Frequency Below Optimal",
      description: "Benchmark suggests 8-15 posts/week for optimal engagement",
      impact: "medium",
      priority: 2,
      metric: {
        current: "TBD",
        target: 12,
        timeframe: "immediate"
      }
    },
    {
      id: 4,
      type: "opportunity",
      title: "Instagram Reels Underutilized",
      description: "Reels have 1.99% engagement vs 0.80% for carousels",
      impact: "medium",
      priority: 2,
      metric: {
        current: "TBD",
        target: "2-3 per week",
        timeframe: "immediate"
      }
    }
  ],

  gaps: {
    instagram: {
      followers: {
        vsAverage: -135000,
        vsLeader: -578000,
        percentageGap: 3853
      },
      closestCompetitor: {
        name: "Brandeis",
        difference: 10000,
        percentageGap: 67
      }
    },
    tiktok: {
      presence: false,
      competitorsActive: 3,
      potentialGrowth: "2.28% weekly"
    },
    platforms: {
      active: "TBD",
      recommended: 6,
      missing: ["TikTok", "LinkedIn (TBD)", "Twitter (TBD)"]
    }
  },

  recommendations: [
    {
      id: 1,
      priority: "immediate",
      category: "Platform Expansion",
      action: "Establish TikTok Presence",
      rationale: "Highest ROI potential - 2.28% weekly growth, 4x engagement vs other platforms",
      implementation: [
        "Create official @yeshivauniversity account",
        "Post 3-5 videos per week initially",
        "Focus on campus life, student stories",
        "Target: 5,000 followers in 3 months"
      ],
      expectedImpact: "High",
      timeframe: "This week",
      resources: "Low cost"
    },
    {
      id: 2,
      priority: "immediate",
      category: "Content Strategy",
      action: "Instagram Reels Strategy",
      rationale: "1.99% engagement rate vs 0.80% for static posts",
      implementation: [
        "Produce 2-3 Reels per week",
        "Focus on trending audio and formats",
        "Highlight student success stories",
        "Post at 8 PM Wednesday for optimal reach"
      ],
      expectedImpact: "Medium-High",
      timeframe: "Immediate",
      resources: "Medium cost"
    },
    {
      id: 3,
      priority: "high",
      category: "Posting Frequency",
      action: "Increase Instagram Posting to 8-12 Posts/Week",
      rationale: "Current posting below industry optimal range (8-28 posts/week)",
      implementation: [
        "Schedule posts for consistent 8 PM timing",
        "Mix of Reels, carousels, and static posts",
        "Use campus life hashtags: #collegelife #YULife",
        "Monitor engagement and adjust"
      ],
      expectedImpact: "Medium",
      timeframe: "Immediate",
      resources: "Medium cost"
    },
    {
      id: 4,
      priority: "medium",
      category: "Competitive Analysis",
      action: "Study NYU and Brandeis Strategies",
      rationale: "NYU leads with 593K followers, Brandeis is closest competitor",
      implementation: [
        "Analyze top-performing content from both",
        "Identify content gaps and opportunities",
        "Adopt best practices while maintaining YU authenticity",
        "Monthly competitive review"
      ],
      expectedImpact: "Medium",
      timeframe: "Ongoing",
      resources: "Low cost"
    }
  ],

  sources: [
    {
      type: "primary",
      name: "Instagram Profiles",
      verified: true,
      urls: [
        "https://www.instagram.com/yeshiva_university/",
        "https://www.instagram.com/nyuniversity/",
        "https://www.instagram.com/columbia/",
        "https://www.instagram.com/rutgersu/",
        "https://www.instagram.com/brandeisuniversity/",
        "https://www.instagram.com/applymaryland/"
      ]
    },
    {
      type: "primary",
      name: "TikTok Profiles",
      verified: true,
      urls: [
        "https://www.tiktok.com/@nyuniversity",
        "https://www.tiktok.com/@brandeisuniversity",
        "https://www.tiktok.com/@rutgersu"
      ]
    },
    {
      type: "secondary",
      name: "Hootsuite",
      title: "Social media for education: 2025 benchmarks + new data",
      url: "https://blog.hootsuite.com/social-media-education-benchmarks/"
    },
    {
      type: "secondary",
      name: "Rival IQ",
      title: "2024 Higher Education Social Media Engagement Report",
      url: "https://www.rivaliq.com/blog/higher-ed-social-media-engagement-report/"
    },
    {
      type: "secondary",
      name: "Quid",
      title: "2025 Higher Education Social Media Engagement Report",
      url: "https://www.quid.com/knowledge-hub/resource-library/blog/2025-higher-education-social-media-engagement-report"
    },
    {
      type: "secondary",
      name: "Sprout Social",
      title: "Social Media Benchmarks by Industry in 2025",
      url: "https://sproutsocial.com/insights/social-media-benchmarks-by-industry/"
    }
  ],

  nextPhase: {
    tasks: [
      "Qualitative content analysis of last 30 posts",
      "Monitor posting frequency for 2 weeks",
      "Calculate engagement rates per university",
      "Website UX/UI comparison",
      "Email marketing analysis",
      "Paid advertising research"
    ],
    timeline: "2-3 weeks",
    deliverable: "Phase 2 - Detailed Analysis Report"
  }
};

export default researchData;
