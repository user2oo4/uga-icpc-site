# UGA ICPC Club Website

This is the public website for the UGA ICPC (International Collegiate Programming Contest) club. The site provides workshop notes, contest resources, a calendar of events, and learning materials for club members and anyone interested in competitive programming.

## Features

- **Workshop Notes:** Each workshop has a dedicated Markdown file rendered as a modern HTML page with code highlighting and LaTeX math support.
- **Contest Calendar:** View upcoming workshops, contests, and events, with direct links to notes and resources.
- **Resource Links:** Quick access to VJudge, USACO Guide, Codeforces, Kattis, QOJ, and more.
- **Consistent Navigation:** All pages feature a unified navbar and clean, readable design.
- **Content Progress Tracking:** See TODO status for each workshop and contest in `TODO.md`.
- **Google Slides Embedding:** Easily embed slides in workshop notes.

## Structure

```
uga-icpc-site/
├── calendar.html         # Event calendar with links to workshops
├── contests.html         # Contest info and links
├── index.html            # Home page
├── leaderboard.html      # Leaderboard (if used)
├── workshops.html        # List of all workshops and resources
├── TODO.md               # Content progress tracker
├── content/              # All workshop notes and rendered HTML
│   ├── complexity.md/.html
│   ├── brute.md/.html
│   ├── greedy.md/.html
│   ├── graph.md/.html
│   ├── set_map.md/.html
│   ├── dp_1.md/.html
│   ├── dp_tree.md/.html
│   ├── binarysearch.md/.html
│   └── ...
├── img/
│   └── logo.png          # Club logo
└── ...
```

## How to Add a New Workshop

1. Write your notes in Markdown (e.g., `content/my_topic.md`).
2. Copy an existing HTML template (e.g., `complexity.html`) and update the fetch path and title.
3. Add a link to the new HTML file in `workshops.html` and (if relevant) in `calendar.html`.
4. Use code blocks (with language tags) and LaTeX for math. Code and math will be rendered automatically.

## Development Notes

- Uses [Marked.js](https://marked.js.org/) for Markdown, [MathJax](https://www.mathjax.org/) for LaTeX, and [highlight.js](https://highlightjs.org/) for code syntax highlighting.
- All navigation and styling is consistent across pages for a clean user experience.
- To update the calendar or workshop list, simply edit the corresponding HTML files.

## Contributing

Contributions are welcome! Please:
- Keep navigation and style consistent.
- Use Markdown for workshop content.
- Update `TODO.md` to track progress.

## License

This project is for educational and club use at UGA. See individual file headers for additional attributions if present.
