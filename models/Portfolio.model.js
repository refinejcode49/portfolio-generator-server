const { Schema, model } = require("mongoose");

const portfolioSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email  is required"],
    },
    imageUrl: {
      type: String,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
    },
    presentation: {
      type: String,
      required: [true, "Presentation is required"],
    },
    githubLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
    experience: [
      {
        jobTitle: {
          type: String,
        },
        companyName: {
          type: String,
        },
        period: {
          from: {
            type: String,
          },
          to: {
            type: String,
          },
        },
        description: {
          type: String,
        },
      },
    ],
    project: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        link: {
          type: String,
        },
        projectImage: {
          type: String,
        },
      },
    ],
    resume: {
      type: String,
    },
    skills: [
      {
        skillsType: String,
        skills: [String],
      },
    ],
    template: String,
    slug: {
      type: String,
      unique: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    // linking to the user
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

//const PortfolioModel = model('portfolio', portfolioSchema)

// module.exports = PortfolioModel
