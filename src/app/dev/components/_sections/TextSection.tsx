import Text from '@/_components/core/Text';

export default function TextSection() {
  return (
    <section className="border-b pb-8">
      <h2 className="text-2xl font-semibold mb-6">Text</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Sizes</h3>
          <div className="space-y-2">
            <Text size="xs">Extra Small Text (xs)</Text>
            <br />
            <Text size="sm">Small Text (sm)</Text>
            <br />
            <Text size="md">Medium Text (md)</Text>
            <br />
            <Text size="lg">Large Text (lg)</Text>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Weights</h3>
          <div className="space-y-2">
            <Text weight="normal">Normal Weight</Text>
            <br />
            <Text weight="medium">Medium Weight</Text>
            <br />
            <Text weight="semibold">Semibold Weight</Text>
            <br />
            <Text weight="bold">Bold Weight</Text>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Colors</h3>
          <div className="space-y-2">
            <Text color="foreground">Foreground Color</Text>
            <br />
            <Text color="muted">Muted Color</Text>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Combined</h3>
          <div className="space-y-2">
            <Text size="lg" weight="bold" color="foreground">
              Large Bold Foreground
            </Text>
            <br />
            <Text size="sm" weight="normal" color="muted">
              Small Normal Muted
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
