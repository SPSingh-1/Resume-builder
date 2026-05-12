import { useResume } from '../../../hooks/useResume';
import { Label } from '../../ui/label';
import { Slider } from '../../ui/slider';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

const TEMPLATES = [
  { id: 'modern', name: 'Modern' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'creative', name: 'Creative' },
  { id: 'ats', name: 'ATS Friendly' },
  { id: 'dark', name: 'Dark Mode' },
];

const FONTS = ['Inter', 'Roboto', 'Georgia', 'Playfair Display', 'Montserrat'];

export function SettingsForm() {
  const { resume, updateResume } = useResume();
  const settings = resume.settings;

  const handleChange = (field: string, value: string | number) => {
    updateResume(prev => ({
      ...prev,
      settings: { ...prev.settings, [field]: value }
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(settings.sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleChange('sectionOrder', items as any);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customize</h2>
        <p className="text-muted-foreground">Change how your resume looks.</p>
      </div>

      <div className="space-y-4">
        <Label>Template</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => handleChange('template', t.id)}
              className={`p-4 border rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                settings.template === t.id 
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5 text-primary' 
                  : 'hover:border-muted-foreground/30 hover:bg-muted/50'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label>Primary Color</Label>
          <div className="flex gap-2 items-center">
            <Input 
              type="color" 
              value={settings.primaryColor} 
              onChange={e => handleChange('primaryColor', e.target.value)}
              className="w-12 h-12 p-1 cursor-pointer"
            />
            <Input 
              value={settings.primaryColor} 
              onChange={e => handleChange('primaryColor', e.target.value)}
              className="font-mono flex-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Accent Color</Label>
          <div className="flex gap-2 items-center">
            <Input 
              type="color" 
              value={settings.accentColor} 
              onChange={e => handleChange('accentColor', e.target.value)}
              className="w-12 h-12 p-1 cursor-pointer"
            />
            <Input 
              value={settings.accentColor} 
              onChange={e => handleChange('accentColor', e.target.value)}
              className="font-mono flex-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Font Family</Label>
          <Select value={settings.fontFamily} onValueChange={v => handleChange('fontFamily', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map(f => (
                <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Font Size</Label>
            <span className="text-xs text-muted-foreground">{settings.fontSize}px</span>
          </div>
          <Slider 
            value={[settings.fontSize]} 
            onValueChange={v => handleChange('fontSize', v[0])}
            min={10} max={18} step={1}
          />
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t">
        <Label>Section Order (Not applied yet to templates, but ready for future)</Label>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {settings.sectionOrder.map((section, index) => (
                  <Draggable key={section} draggableId={section} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-3 p-3 bg-card border rounded-lg shadow-sm"
                      >
                        <div {...provided.dragHandleProps} className="cursor-grab text-muted-foreground">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <span className="capitalize font-medium text-sm">{section}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
