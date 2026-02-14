import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { StaffAssignment } from '@/types/staff_assignment';

interface StaffAssignmentListProps {
  items: StaffAssignment[];
  onEdit?: (item: StaffAssignment) => void;
  onDelete?: (id: string) => void;
}

export function StaffAssignmentList({ items, onEdit, onDelete }: StaffAssignmentListProps) {
  if (items.length === 0) {
    return <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">No items yet. Create your first one!</div>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex-1">
              <p className="font-medium">{String(item["user_id"])}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{String(item["active"])}</p>
            </div>
            <div className="flex gap-2">
              {onEdit && <Button variant="ghost" size="icon" onClick={() => onEdit(item)}><Pencil className="h-4 w-4" /></Button>}
              {onDelete && <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
