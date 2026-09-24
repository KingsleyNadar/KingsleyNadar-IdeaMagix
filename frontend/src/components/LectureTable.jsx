import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LectureTable({ lectures, emptyMessage }) {
  if (!lectures || lectures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm border-dashed font-serif">
        <div className="w-16 h-16 bg-victorian-offwhite border border-victorian-gold/30 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-victorian-gold" />
        </div>
        <h3 className="text-xl italic text-victorian-ink mb-1">No Lectures Found</h3>
        <p className="text-victorian-charcoal text-center max-w-sm">{emptyMessage || "There are no lectures assigned to this schedule."}</p>
      </div>
    );
  }

  return (
    <div className="bg-victorian-offwhite border border-victorian-charcoal/30 rounded-sm overflow-hidden shadow-sm font-serif">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-victorian-paper border-b border-victorian-charcoal/30 text-xs uppercase tracking-widest text-victorian-charcoal font-semibold">
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Course Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-victorian-charcoal/10">
            {lectures.map((lecture) => (
              <tr key={lecture._id} className="hover:bg-victorian-paper transition-colors">
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-victorian-gold" />
                    <span className="italic text-victorian-ink">
                      {format(new Date(lecture.date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {lecture.course?.image ? (
                      <img 
                        src={`https://kingsleynadar-ideamagix.onrender.com${lecture.course.image}`} 
                        alt="" 
                        className="w-10 h-10 rounded-sm object-cover border border-victorian-gold/50" 
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-sm bg-victorian-paper flex items-center justify-center border border-victorian-gold/30">
                        <BookOpen className="w-5 h-5 text-victorian-gold" />
                      </div>
                    )}
                    <div>
                      <div className="text-victorian-ink italic">{lecture.course?.name}</div>
                      <div className="text-xs text-victorian-charcoal mt-0.5">{lecture.course?.level}</div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
