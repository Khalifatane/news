# Blog Owner Notice and Website Guide

This guide explains how to publish and maintain content on the website, with a focus on clear writing and a reliable reader experience.

## 1. Open the content studio

The website's content is managed in Sanity Studio. Open the Studio on your deployed website at `/studio`, for example `https://your-domain.com/studio`. For local development, use `http://localhost:3000/studio` while the app is running.

Sign in with an account that has access to the Sanity project. If you cannot sign in or cannot see the content types listed below, ask the site administrator to check your project access and Studio configuration. Do not share passwords, API tokens, or secret environment values in articles or messages.

## 2. Write and publish an article

1. In Studio, create a new **Article**.
2. Write a specific, accurate **Headline**. Headlines can be up to 150 characters, but shorter headlines are usually easier to scan.
3. Set the **URL slug**. Use a short, readable phrase with lowercase words and hyphens. Avoid changing a published article's slug unless necessary, because old links may stop working.
4. Select an existing **Category** and **Author**. Both are required.
5. Check the **Publication date** and set the estimated **Reading time** in minutes.
6. Add a **Cover image** and descriptive alternative text. Choose an image that represents the story, not just a decorative image.
7. Write a concise **Summary / excerpt**. It is required and limited to 280 characters. Explain the main point without repeating the headline word for word.
8. Write the **Article body**. Use normal paragraphs, headings to organize longer pieces, and quotes where they add useful context. Add inline images only when they support the story; provide alternative text and a caption when appropriate.
9. Review the **SEO title** and **SEO description** in the SEO fields if you want search results to use text different from the headline and excerpt. The limits are 60 characters and 160 characters respectively.
10. Preview the article, check the text and images, then **Publish** it when it is ready for readers.

Unpublished drafts are for editing and review; readers generally see the published version. After publishing, open the article on the live website and check the headline, image, category, author, date, and body.

## 3. Writing for readers

- Put the main news, idea, or useful information near the beginning.
- Use plain, direct language. Explain unfamiliar terms and avoid unnecessary jargon.
- Keep paragraphs focused. Break up long sections with meaningful headings.
- Be accurate: verify names, dates, figures, quotations, and links before publishing.
- Distinguish facts from opinion and clearly attribute claims and quotations.
- Do not use a headline or image that promises something the article does not deliver.
- Use a consistent spelling, punctuation, and date style across articles.
- Link to relevant, trustworthy sources when readers may need evidence or more detail.
- Check that links work and that linked content is appropriate for your audience.

## 4. Images and accessibility

- Use images you own, have permission to use, or that are licensed for your intended use. Follow any attribution requirements.
- Use a good-quality, relevant cover image. Keep the important subject visible near the center because the frontend may crop images to fit different screen sizes.
- Write alternative text that conveys the image's useful information. For a purely decorative image, use empty alternative text if the Studio allows it; do not put phrases such as “image of” in every description.
- Do not put essential story text only inside an image.
- Check the article on a phone as well as a desktop. Confirm images load, are not awkwardly cropped, and do not overwhelm the text.

## 5. Categories, navigation, and article links

Categories organize stories and can appear in the site's navigation. Assign every article to the most relevant available category. The category page lists published stories assigned to that category.

If a needed category does not exist, ask the site administrator to add it. Avoid creating near-duplicate categories or renaming a category that is already in use without checking existing articles and links.

Published articles are reached at `/articles/<slug>`. Category pages are reached at `/category/<slug>`. Search is available at `/search` and looks through published article titles, excerpts, and body text.

## 6. Featured and trending headlines

The homepage has **Featured** and **Trending Headlines** areas. In the Article editor, the **Featured story** and **Trending story** checkboxes are available, but in the current frontend those flags alone do not select the homepage's curated stories.

The frontend is designed to read its homepage selections from a **Newsletter Homepage** document, including **Featured hero stories**, **Secondary featured story**, **Trending stories**, and navigation categories. However, that document type is not currently registered in this project's Studio configuration. As a result, an editor cannot currently manage those curated lists through the Studio. When no homepage selections are available, the homepage falls back to recent published articles; Trending Headlines can therefore show recent stories rather than an explicitly curated list.

To curate these sections, ask the site administrator to register and configure the Newsletter Homepage document in Studio, then provide editorial access to its selection fields. Do not create a new homepage document or change schema/configuration yourself unless you are responsible for the website's code.

### Market ticker

The homepage market ticker is managed from the **Settings** singleton in Studio. Enable **Show market ticker**, then add items under **Market ticker items**. Each item needs a **Symbol** (up to 100 characters), **Displayed value** (up to 250 characters), **Change text** (up to 100 characters), and **Direction** (Up, Down, or Unchanged). The ticker appears directly below the site header. If there are no complete items, it displays labeled sample values; replace those with verified values in Settings before presenting them as current. Ticker values are entered by editors and are **not live market data**. Turn off **Show market ticker** to hide it.

## 7. Review the frontend before and after publishing

Before publishing, use Studio's preview or Presentation view if available. Review:

- Whether the headline and summary make sense in a compact card as well as on the full article page.
- Whether the cover and inline images load and have useful alternative text.
- Whether paragraphs, headings, quotes, and captions are readable on a phone.
- Whether the category and author are correct.
- Whether links point to the intended destination.

After publishing, open the live article and homepage. Content updates should appear through the site's Sanity live update integration; allow a brief moment for the page to refresh. If an update does not appear, reload the page and check that you published the correct document and dataset.

## 8. Common problems

**My article does not appear on the site.** Confirm that it is published, has a slug, and has the required category and author. Check the publication date and make sure you are viewing the correct website environment.

**My article is missing from a category.** Confirm that the article is published and assigned to that category.

**My headline appears but the image does not.** Confirm that the image finished uploading, is attached to the correct image field, and has alternative text. Then reload the page. If it still does not load, send the administrator the article URL and a screenshot; never send API tokens.

**Trending Headlines did not change when I checked “Trending story.”** This is expected with the current frontend: that checkbox is not wired to the homepage's curated Trending Headlines selection. See Section 6.

**I cannot find a homepage editor.** The current Studio does not register the Newsletter Homepage schema. Contact the site administrator; do not create a separate homepage as a workaround.

**I cannot edit or publish a document.** Your Sanity account may not have the required role. Ask the project administrator to grant appropriate access.

## 9. Publishing checklist

Before publishing, confirm:

- [ ] The headline is accurate and clear.
- [ ] The URL slug is readable and correct.
- [ ] Category, author, date, and reading time are set.
- [ ] The excerpt is concise and within the 280-character limit.
- [ ] The cover image is relevant, licensed, and has alternative text.
- [ ] The article body has been proofread and its links checked.
- [ ] SEO fields are useful if provided.
- [ ] The preview has been checked on desktop and mobile.
- [ ] The document is ready to publish, not merely save as a draft.

## 10. Who maintains what

Blog owners and editors should manage article content, images, categories, and authors through Sanity Studio. The site administrator or developer should handle frontend layout, route behavior, Sanity schema registration, account permissions, deployment, and environment configuration.

Never put private tokens, passwords, or `.env.local` contents into this file, an article, GitHub, or a public message.
