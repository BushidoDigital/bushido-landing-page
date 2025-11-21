import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
            schema: z.object({
                title: z.string(),
                excerpt: z.string().optional(),
                date: z.string().or(z.date()).optional(),
                cover: z.string().optional(),
                tags: z.array(z.string()).optional(),
                client: z.string().optional()
            })
        })
    }
})
