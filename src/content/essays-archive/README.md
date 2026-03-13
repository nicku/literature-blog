# Archived Essays

Essays in this folder are **not shown** on the site. They are kept here for easy restoration.

## Currently archived

- **Big Data** (BigData-en.md, BigData-he.md) – essay on Vonnegut's *Galápagos*
- **Hertzel's Utopia** (altnoiland-en.md, altnoiland-he.md) – essay on Herzl's *Altneuland*

## Restoring an essay

To bring an essay back onto the site:

1. Copy or move the file(s) from `src/content/essays-archive/` to `src/content/essays/`
2. No code changes needed – the site picks up new files automatically

**Example – restore Big Data:**
```bash
cp src/content/essays-archive/BigData-en.md src/content/essays/
cp src/content/essays-archive/BigData-he.md src/content/essays/
```

**Example – restore Hertzel's Utopia:**
```bash
cp src/content/essays-archive/altnoiland-en.md src/content/essays/
cp src/content/essays-archive/altnoiland-he.md src/content/essays/
```

## Archiving an essay

To hide an essay from the site but keep it for later:

1. Move the file(s) from `src/content/essays/` to `src/content/essays-archive/`
2. Optionally add a note in this README about what was archived

```bash
mv src/content/essays/MyEssay-en.md src/content/essays-archive/
mv src/content/essays/MyEssay-he.md src/content/essays-archive/
```
