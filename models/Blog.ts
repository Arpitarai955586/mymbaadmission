import mongoose, { Schema } from "mongoose"

const BlogPostSchema = new Schema(
  {
    blog_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
    },

    body: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    tags: {
      type: [String],
      default: [],
    },

    readTime: {
      type: String,
    },

    is_published: {
      type: Boolean,
      default: false,
    },

    is_trending: {
      type: Boolean,
      default: false,
    },

    featured_image: {
      type: String,
    },

    views: {
      type: Number,
      default: 0,
    },

    seo: {
      meta_title: {
        type: String,
      },
      meta_description: {
        type: String,
      },
      keywords: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

export default mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema)
