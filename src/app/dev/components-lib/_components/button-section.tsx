
import Button from '@/shared/components/core/button';

export default function ButtonSection() {
  return (
    <section className="border-b pb-8">
      <h2 className="text-2xl font-semibold mb-6">Button</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Variants</h3>
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="primary-light">Primary Light</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="danger-light">Danger Light</Button>
            <Button variant="muted">Muted</Button>
            <Button variant="muted-light">Muted Light</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Sizes</h3>
          <div className="flex gap-3 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
