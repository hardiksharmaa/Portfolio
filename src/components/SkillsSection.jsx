import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Code,     
  MousePointer2, 
  Atom,      
  Type,       
  Palette,    
  AppWindow,  
  Server,     
  Database,   
  Cloud, 
  Box,        
  Settings,   
  GitBranch,  
} from "lucide-react";


const skills = [
  { name: "HTML/CSS", level: 95, category: "frontend", icon: Code },
  { name: "JavaScript", level: 90, category: "frontend", icon: MousePointer2 },
  { name: "React", level: 90, category: "frontend", icon: Atom },
  { name: "TypeScript", level: 85, category: "frontend", icon: Type },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: Palette },
  { name: "Next.js", level: 80, category: "frontend", icon: AppWindow },

  { name: "Node.js", level: 80, category: "backend", icon: Server },
  { name: "Express", level: 75, category: "backend", icon: Server },
  { name: "MongoDB", level: 70, category: "backend", icon: Database },
  { name: "PostgreSQL", level: 75, category: "backend", icon: Database },
  { name: "MySQL", level: 83, category: "backend", icon: Database },

  { name: "AWS", level: 60, category: "Cloud & DevOps", icon: Cloud },
  { name: "Docker", level: 80, category: "Cloud & DevOps", icon: Box },
  { name: "CI/CD", level: 65, category: "Cloud & DevOps", icon: Settings },
  { name: "Git/GitHub", level: 78, category: "Cloud & DevOps", icon: GitBranch },
];

const categories = ["all", "frontend", "backend", "Cloud & DevOps"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => {
            const IconComponent = skill.icon; 

            return (
              <div
                key={key}
                className="bg-card p-6 rounded-lg shadow-xs card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-primary" />
                  )}
                </div>
                
                <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                    style={{ width: skill.level + "%" }}
                  />
                </div>

                <div className="text-right mt-1">
                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};