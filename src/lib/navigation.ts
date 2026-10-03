export type PageId = 
    | "home" 
    | "about" 
    | "education" 
    | "projects" 
    | "skills" 
    | "work"

interface Page {
    id: PageId
    label: string
}

export const pages: Page[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
]