import { describe, expect, test } from 'bun:test';
import { citationsFromEvent, deltaFromAzureEvent, parseAzureEvent } from '@/lib/pranav/azure';

describe('Azure response translation', () => {
  test('parses streamed text deltas', () => {
    const event = parseAzureEvent(
      'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"Hello"}'
    );
    expect(event && deltaFromAzureEvent(event)).toBe('Hello');
  });

  test('extracts and deduplicates file citations', () => {
    const citations = citationsFromEvent({
      response: {
        output: [
          {
            content: [
              {
                annotations: [
                  { type: 'file_citation', filename: 'resume.pdf', file_id: 'file-1' },
                  { type: 'file_citation', filename: 'resume.pdf', file_id: 'file-1' },
                ],
              },
            ],
          },
        ],
      },
    });
    expect(citations).toEqual([{ filename: 'resume.pdf', fileId: 'file-1' }]);
  });
});
