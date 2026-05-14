import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
	}),
});

const portfolioCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		company: z.string(),
		category: z.string(),
		description: z.string(),
		thumbnail: z.string(),
		linkLabel: z.string(),
		linkUrl: z.string(),
	}),
});

export const collections = {
	post: postCollection,
	portfolio: portfolioCollection,
};
