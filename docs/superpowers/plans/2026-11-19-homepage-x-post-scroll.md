# 2026 Homepage X Post Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the requested SIGIR-AP X post to the top of the existing vertically scrollable homepage post list.

**Architecture:** Reuse the homepage's existing X embed markup. Add one `twitter-tweet` block before the two current blocks, leaving the scroll container and single widgets script unchanged.

**Tech Stack:** Static HTML, X widgets embed script, Python/BeautifulSoup verification.

## Global Constraints

- New post URL: `https://x.com/ACMSIGIR_AP/status/2123381737350955054`.
- Keep the posts newest first.
- Preserve `overflow-y: auto` and `max-height: 600px`.
- Keep exactly one `https://platform.twitter.com/widgets.js` script.
- Do not alter other homepage content or layout.

---

### Task 1: Add the X post to the homepage scroll list

**Files:**
- Modify: `sigir-ap-2026/index.html:212-221`

**Interfaces:**
- Consumes: X's existing `blockquote.twitter-tweet` embed convention.
- Produces: Three embedded SIGIR-AP post links in newest-first order inside the existing scroll container.

- [ ] **Step 1: Run a failing content assertion**

```bash
python3 - <<'PY'
from pathlib import Path
from bs4 import BeautifulSoup

soup = BeautifulSoup(Path('sigir-ap-2026/index.html').read_text(), 'html.parser')
scroll = next(div for div in soup.find_all('div') if 'overflow-y: auto' in div.get('style', ''))
urls = [a['href'] for a in scroll.select('blockquote.twitter-tweet a[href]')]
assert urls == [
    'https://x.com/ACMSIGIR_AP/status/2123381737350955054',
    'https://x.com/ACMSIGIR_AP/status/2118258518260375762',
    'https://x.com/ACMSIGIR_AP/status/2077785038054396244',
]
PY
```

Expected: FAIL because the new `2123381737350955054` post is absent.

- [ ] **Step 2: Add the minimal embed block**

Insert this block immediately before the existing `2118258518260375762` block:

```html
<blockquote class="twitter-tweet">
    <a href="https://x.com/ACMSIGIR_AP/status/2123381737350955054" target="_blank">Loading tweet...</a>
</blockquote>
```

- [ ] **Step 3: Verify content, order, scrolling, and script count**

Run the Step 1 assertion again, then assert:

```python
style = scroll.get('style', '')
assert 'overflow-y: auto' in style
assert 'max-height: 600px' in style
assert len(soup.select('script[src="https://platform.twitter.com/widgets.js"]')) == 1
```

Expected: PASS.

- [ ] **Step 4: Verify the diff is isolated**

```bash
git diff --check
git status --short
git diff -- sigir-ap-2026/index.html
```

Expected: The implementation changes only `sigir-ap-2026/index.html`, adding one three-line blockquote.

- [ ] **Step 5: Leave the implementation unpushed for user review**

Do not push to GitHub until the user explicitly approves the local result.
