import Text from "@/shared/components/core/text";

export default function TextSection() {
  return (
    <section className="border-b pb-8">
      <h2 className="text-2xl font-semibold mb-6">Text</h2>

      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-sm font-medium mb-3">Title Variants</h3>
          <div className="space-y-3">
            <div>
              <Text variant="title-1">Title 1</Text>
            </div>
            <div>
              <Text variant="title-2">Title 2</Text>
            </div>
            <div>
              <Text variant="title-3">Title 3</Text>
            </div>
            <div>
              <Text variant="title-4">Title 4</Text>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Body Variants</h3>
          <div className="space-y-3">
            <div>
              <Text variant="body-1">Body 1</Text>
            </div>
            <div>
              <Text variant="body-2">Body 2</Text>
            </div>
            <div>
              <Text variant="body-3">Body 3</Text>
            </div>
            <div>
              <Text variant="body-4">Body 4</Text>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Colors</h3>
          <div className="space-y-3">
            <div>
              <Text color="normal">Normal Color</Text>
            </div>
            <div>
              <Text color="primary">Primary Color</Text>
            </div>
            <div>
              <Text color="danger">Danger Color</Text>
            </div>
            <div>
              <Text color="light">Light Color</Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
