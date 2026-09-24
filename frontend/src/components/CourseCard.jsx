import { BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CourseCard({ course }) {
  const getLevelColor = (level) => {
    return 'bg-victorian-paper text-victorian-ink border-victorian-gold/50';
  };

  return (
    <div className="bg-victorian-offwhite border border-victorian-charcoal/30 rounded-sm p-1 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group font-serif">
      <div className="relative h-48 bg-victorian-paper border border-victorian-charcoal/20 overflow-hidden">
        {course.image ? (
          <img 
            src={`https://kingsleynadar-ideamagix.onrender.com${course.image}`} 
            alt={course.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-victorian-gold/40">
            <BookOpen className="w-12 h-12 opacity-30" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={cn(
            "px-3 py-1 text-[10px] uppercase tracking-widest font-serif rounded-sm border shadow-sm",
            getLevelColor(course.level)
          )}>
            {course.level}
          </span>
        </div>
      </div>
      <div className="p-5 border border-victorian-charcoal/10 mt-1 bg-victorian-paper">
        <h3 className="text-xl italic text-victorian-ink line-clamp-1 mb-2 border-b border-victorian-gold/30 pb-2">{course.name}</h3>
        <p className="text-sm text-victorian-charcoal line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      </div>
    </div>
  );
}
