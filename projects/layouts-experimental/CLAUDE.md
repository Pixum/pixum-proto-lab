i onlyCLAUDE.md — Layouts Prototype
1. Project Overview
Project name: Layouts Prototype
Purpose:Create an experimental, browser-based layout playground for experimenting with book layouts through global design variables.
The application consists of a visual canvas displaying a book and a control sidebar that allows users to adjust variables and see their impact on all layouts in real time.
This is an experimental prototype. Prioritize flexibility, visual quality, usability and fast iteration over unnecessary complexity.
2. Core Product Concept
The application consists of two main areas:
Canvas
	•	Displays the complete book structure.
	•	Provides an overview of all pages and double-page spreads.
	•	Allows users to zoom into individual pages or spreads.
	•	Updates immediately when variables change.
	•	Serves exclusively as a visual preview.
Sidebar
	•	Positioned on the right side of the interface.
	•	Contains all controls for adjusting design variables.
	•	Organizes controls into clearly structured groups.
	•	Changes made in the sidebar immediately update the canvas.
Important Interaction Principle
The canvas is NOT an editor.
Users must never be able to directly edit, select, move, resize or manipulate individual elements on the canvas.
All layout changes must happen exclusively through the sidebar.
Do not implement:
	•	Drag-and-drop editing.
	•	Direct object manipulation.
	•	Inline text editing.
	•	Direct resizing or repositioning of elements.
The canvas is a representation of the current variable configuration, not an editing surface.
3. Book Structure
The prototype represents a book with the following structure:
	•	1 opening page.
	•	4 double-page spreads.
	•	1 closing page.
Total: 10 pages.
The book should be presented as a coherent sequence rather than unrelated artboards.
Users should be able to:
	•	View the entire book in an overview.
	•	Zoom into individual pages or double-page spreads.
	•	Navigate between different parts of the book.
The exact layout structures and page designs will be defined separately.
4. Variable System
The prototype uses global design variables.
Requirements:
	•	One central variable configuration controls the entire book.
	•	Changing a variable updates every relevant occurrence throughout the book.
	•	No page-specific variable overrides.
	•	No independent page-level configurations.
	•	The sidebar is the only interface for modifying variables.
The variable categories, names, values and individual layout rules will be specified in separate project documentation.
Do not invent or hardcode design rules that have not been defined.
Keep the variable system modular and flexible so that new variables and layout rules can be introduced later.
5. Visual Direction
The overall aesthetic should feel like a modern, sophisticated and experimental design tool.
General direction
	•	Dark interface.
	•	Tech-inspired visual language.
	•	Minimalistic and restrained.
	•	Subtle glassmorphism, particularly in the sidebar.
	•	Subtle dotted background on the canvas.
	•	Clear visual hierarchy.
	•	Precise alignment and spacing.
Sidebar
	•	Glass-effect appearance.
	•	Subtle transparency and background blur.
	•	Restrained borders and separators.
	•	Clean, well-organized controls.
Canvas
	•	Dark background.
	•	Subtle dotted grid pattern.
	•	Layout pages should stand out clearly against the background.
	•	Avoid unnecessary visual distractions.
Design principles
	•	Everything should feel intentional and considered.
	•	Avoid generic SaaS dashboard aesthetics.
	•	Avoid excessive gradients, glow effects and strong shadows.
	•	Avoid unnecessary decoration.
	•	Prioritize usability and clarity.
	•	Use subtle transitions and micro-interactions where they improve the experience.
The interface should feel premium without becoming visually overwhelming.
6. Development Environment & Architecture
The project will be developed from scratch using Visual Studio Code and Claude Code.
Claude is responsible for establishing the initial project structure and development environment.
Technical expectations
	•	Choose modern, reliable and well-maintained technologies.
	•	Prioritize a modular and maintainable architecture.
	•	Separate UI components, canvas rendering, sidebar controls and variable logic.
	•	Avoid unnecessary dependencies.
	•	Keep the application easy to extend.
Before introducing major technologies, libraries or architectural decisions, explain the reasoning and ask for approval.
Do not assume that a technology choice has been approved unless explicitly confirmed.
7. Development Workflow
Follow an incremental development approach.
	1	Break the project into small, manageable steps.
	2	Implement one feature at a time.
	3	Verify that each feature works before moving forward.
	4	Keep the application functional throughout development.
	5	Avoid implementing features that have not been agreed upon.
	6	Keep components modular and reusable.
Do not attempt to build the entire application in one large implementation step.
Important
Before starting a new implementation phase, briefly explain:
	•	What you intend to build.
	•	How you intend to approach it.
	•	Whether any important decisions or dependencies need approval.
8. State Management & Persistence
The prototype should remember the user's latest variable configuration.
Requirements:
	•	Automatically save changes.
	•	Restore the latest configuration after refreshing the browser.
	•	Update the canvas immediately when variables change.
	•	Provide a clearly accessible reset button.
	•	Reset should restore the original default configuration.
A local browser storage solution is sufficient for the initial prototype.
No backend, authentication or user accounts are required unless explicitly requested later.
9. Design References
Visual references and screenshots may be provided occasionally.
When references are provided:
	•	Analyze their visual hierarchy, spacing, styling and interaction patterns.
	•	Use them as inspiration rather than copying them blindly.
	•	Preserve the established visual direction.
	•	Do not introduce conflicting design patterns without discussing them first.
When no references are available, make thoughtful design decisions based on the project guidelines.
10. Decision Making & Problem Solving
Ask before changing the agreed approach.
When encountering technical problems:
	•	Explain the issue in accessible language.
	•	Present possible solutions.
	•	Explain the advantages and disadvantages where relevant.
	•	Wait for approval before introducing a fundamentally different approach.
Do not silently:
	•	Remove functionality.
	•	Simplify agreed requirements.
	•	Replace technologies or libraries.
	•	Change the architecture.
	•	Compromise important design or interaction principles.
Normal implementation details can be handled independently as long as they respect the agreed requirements.
11. Code Quality & Documentation
Maintain a clean, understandable and well-structured codebase.
Requirements:
	•	Use reusable and modular components.
	•	Use descriptive naming conventions.
	•	Keep files logically organized.
	•	Add comments where they clarify complex logic.
	•	Avoid unnecessary abstractions.
	•	Keep documentation updated when architecture changes.
Prefer simple, maintainable solutions over unnecessary technical complexity.
12. Testing & Quality Control
Keep testing lightweight but consistent.
After implementing a feature:
	•	Verify that the application starts successfully.
	•	Check that the feature works as intended.
	•	Check for obvious runtime and console errors.
	•	Fix issues introduced by the implementation before moving on.
Do not assume that code works just because it compiles.
13. Communication
Communicate in clear, accessible language.
Assume the user is working primarily from a design perspective rather than as an experienced developer.
Therefore:
	•	Avoid unnecessary technical jargon.
	•	Explain important technical decisions briefly.
	•	Clearly summarize completed work.
	•	Explain what changed and why.
	•	Provide precise next steps when user input or action is required.
	•	Explain technical problems before asking for decisions.
Do not overwhelm the user with implementation details unless requested.
14. Separate Project Documentation
The main CLAUDE.md defines project-wide working principles and technical constraints.
Detailed design specifications must live in separate documentation files.
Create and maintain the following documentation structure:
	•	docs/PROJECT_OVERVIEW.md — Product concept and scope.
	•	docs/DESIGN_DIRECTION.md — Visual design principles and references.
	•	docs/VARIABLE_SYSTEM.md — Variable definitions and behavior.
	•	docs/LAYOUT_SPECIFICATIONS.md — Book structure and individual layout rules.
	•	docs/INTERACTIONS.md — User interactions and behavior.
Create initial templates for these documents, but do not invent their detailed contents.
Always consult relevant documentation before implementing or changing the corresponding functionality.
If requirements are missing or contradictory, ask for clarification instead of making assumptions.
15. Overall Guiding Principle
Build a visually sophisticated, minimalistic and intuitive experimental design tool.
The experience should make it effortless to experiment with global design variables and immediately understand their impact across an entire book.
Prioritize:
	1	Excellent visual quality.
	2	Clear and intuitive UX.
	3	Reliable live updates.
	4	Flexible and maintainable architecture.
	5	Incremental development.
The goal is not to build another generic editor. The goal is to create a focused, enjoyable environment for experimenting with book layouts.
