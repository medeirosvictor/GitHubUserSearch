# Agent Review — GitHub User Search

## Overall Impression

This is a clean, functional mini-app that does its job. The component decomposition is reasonable and the Tailwind theming is well set up. That said, there are several areas where the codebase could be tightened up for maintainability, DX, and user experience.

---

## Critical Issues

### 1. Duplicated `User` Interface (High Priority)
The `User` interface is copy-pasted in **four separate files**: `App.tsx`, `SearchForm.tsx`, `SearchResults.tsx`, and `UserCard.tsx`. This is a maintenance hazard — if the shape changes, you need to update it everywhere.

**Fix:** Create `src/types.ts` and export the `User` type once. Import it everywhere.

### 2. Background Color Doesn't Fill Viewport (Bug)
The CSS sets `height: 100%` on `html, body, #root, .app`, but the `.app` div uses `flex flex-col` and the `<main>` doesn't expand to fill remaining space. When content is short, the background cuts off.

**Fix:** Use `min-h-screen` instead of relying on `height: 100%`, and add `flex-1` to `<main>` so it stretches.

### 3. No Rate Limit Handling
The GitHub Search API allows only **10 requests/minute** for unauthenticated requests. There's no debouncing, no cooldown UI, and no specific handling of 403/rate-limit responses. Users will hit this quickly.

**Fix:** At minimum, parse the `X-RateLimit-Remaining` header and show a warning. Ideally add a debounce or throttle on the search.

---

## Code Quality Suggestions

### 4. Unused Dependencies
`daisyui` and `@heroicons/react` are installed but never imported. This bloats `node_modules` and is confusing for other developers.

**Fix:** Remove them or use them.

### 5. Inconsistent Styling Approach
Some components define a `classes` object (`SearchForm`), others use inline Tailwind strings. Pick one pattern and stick with it.

### 6. Pagination State Bug
`Pagination.tsx` has its own `activePage` state that can drift out of sync with `SearchResults`'s `currentPage`. When `postPerPage` changes, `currentPage` resets in `SearchResults` but `activePage` in `Pagination` stays stale.

**Fix:** Remove the local `activePage` state from `Pagination` and pass `currentPage` as a prop instead.

### 7. Missing Key Best Practice
In `SearchResults`, the `map` uses array `index` as the key. Since user results can change between searches, this can cause subtle React reconciliation bugs.

**Fix:** Use `user.login` (which is unique) as the key instead of `index`.

---

## UX / Feature Suggestions

### 8. No Loading State
When a search is in progress, the only indicator is the text "Searching...". A spinner or skeleton cards would feel more responsive.

### 9. No Empty State Design
When no users are found, the page just shows the status message with no visual treatment. A simple illustration or styled empty state would help.

### 10. Search on Enter Only
The form requires clicking "Search" or pressing Enter. Consider adding a debounced live-search mode, or at minimum making the UX clearer (the button styling is fine, but the inputs lack labels).

### 11. No Responsive Polish
The layout uses `max-w-5/6` on main and fixed `w-[300px]` on cards, but there's no real responsive breakpoint handling. On very small screens the cards may overflow.

### 12. Accessibility
- Inputs have no `<label>` elements (only `placeholder` text, which disappears on focus)
- The logo `<img>` alt text is generic
- Pagination buttons have no `aria-current` or `aria-label`

---

## Architecture Suggestions

### 13. Extract API Logic
The fetch call lives directly in `SearchForm`. Extract it to `src/api/github.ts` so it's testable and reusable.

### 14. Consider a Custom Hook
The search state (users, status, loading, error) is a good candidate for a `useGitHubSearch` custom hook that encapsulates the fetch + state management.

### 15. Add Error Boundary
There's no `ErrorBoundary` component. If the API response shape changes or a component throws, the whole app white-screens.

---

## Summary

| Area | Rating | Notes |
|------|--------|-------|
| Functionality | ✅ Good | Core search works well |
| Code Organization | ⚠️ Fair | Duplicated types, API in component |
| Styling | ⚠️ Fair | Theme is nice, but inconsistent patterns + BG bug |
| UX | ⚠️ Fair | Functional but missing loading/error/empty states |
| Accessibility | ❌ Needs Work | No labels, no ARIA attributes |
| Testing | ❌ Missing | No tests at all |
| Dependencies | ⚠️ Fair | Unused packages installed |
