# 2026 Homepage X Post Update Design

## Scope

Add the X post at `https://x.com/ACMSIGIR_AP/status/2123381737350955054` to the SIGIR-AP 2026 homepage.

## Design

- Add the new post as the first `twitter-tweet` block so posts remain ordered newest first.
- Keep the two existing posts unchanged beneath it.
- Preserve the existing `max-height: 600px` container and `overflow-y: auto` vertical scrolling behavior.
- Continue loading `https://platform.twitter.com/widgets.js` once, after all post blocks.
- Do not change the homepage layout, dimensions, or other content.

## Verification

- The homepage contains exactly the three expected SIGIR-AP post URLs in newest-first order.
- The post container still uses vertical scrolling with a 600px maximum height.
- The X widgets script appears exactly once.
- No file other than `sigir-ap-2026/index.html` is changed by the implementation.
