import ButtonSection from '@/app/dev/components-lib/_components/button-section';
import InputSection from '@/app/dev/components-lib/_components/input-section';
import TextSection from '@/app/dev/components-lib/_components/text-section';

export default function ComponentsDevPage() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Component Library</h1>
      <div className="space-y-12">
        <ButtonSection />
        <InputSection />
        <TextSection />
      </div>
    </div>
  );
}
