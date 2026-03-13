---
description: This file describes the data fetching guidelines for the project. Read this file to understand how to fetch data efficiently and securely in our codebase.
---

# Data Fetching Guidelines

This document outlines the best practices for fetching data in our Next.js application. Follow these guidelines to ensure that your data fetching code is efficient, secure, and maintainable.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS use Server Components for data fetching. NEVER use Client Components for data fetching.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in your components.

All helper functions in the /data directory should use Drizzle ORM for database interactions.
