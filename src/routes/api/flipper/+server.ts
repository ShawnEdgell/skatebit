// src/routes/api/flipper/+server.ts
import { error } from '@sveltejs/kit';
import { parseStringPromise, Builder } from 'xml2js';
import type { RequestHandler } from '@sveltejs/kit';

// Define an interface that represents the structure of the settings object
interface Settings {
  lfPosSpeed: number;
  rfPosSpeed: number;
  lfRotSpeed: number;
  rfRotSpeed: number;
  lfPos: { x: number; y: number; z: number };
  rfPos: { x: number; y: number; z: number };
  lfRot: {
    x: number;
    y: number;
    z: number;
    w: number;
    eulerAngles: {
      x: number;
      y: number;
      z: number;
    };
  };
  rfRot: {
    x: number;
    y: number;
    z: number;
    w: number;
    eulerAngles: {
      x: number;
      y: number;
      z: number;
    };
  };
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      throw new Error('No file uploaded or incorrect file type.');
    }
    const xmlData = await file.text();

    // Parse the XML data
    const parsedXml = await parseStringPromise(xmlData);

    // Get the stance settings node and flip all categories that contain "StanceSettings"
    const stanceSettings = parsedXml.StanceSettings;
    if (stanceSettings) {
      for (const category in stanceSettings) {
        if (category.includes('StanceSettings')) {
          const settings = stanceSettings[category];
          if (Array.isArray(settings)) {
            // Iterate over each instance of the category
            settings.forEach((instance: Settings) => {
              swapFootSettings(instance);
            });
          } else if (typeof settings === 'object') {
            // If not an array and it's an object, assume it's a single instance
            swapFootSettings(settings as Settings); // Assert type
          }
        }
      }
    }

    // Convert the modified object back to XML
    const builder = new Builder();
    const newXml = builder.buildObject(parsedXml);

    // Create a new Response object
    const response = new Response(newXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': 'attachment; filename="flipped.xml"'
      }
    });

    return response;
  } catch (err) {
    console.error('Error processing XML:', err);
    throw error(500, 'Failed to process XML. Please try again.');
  }
};

// Update your function to use this interface
function swapFootSettings(settings: Settings) {
  // Swap logic
  [settings.lfPosSpeed, settings.rfPosSpeed] = [settings.rfPosSpeed, settings.lfPosSpeed];
  // Swap rotation speeds
  [settings.lfRotSpeed, settings.rfRotSpeed] = [settings.rfRotSpeed, settings.lfRotSpeed];
  // Swap positions
  [settings.lfPos, settings.rfPos] = [settings.rfPos, settings.lfPos];
  // Swap rotations
  [settings.lfRot, settings.rfRot] = [settings.rfRot, settings.lfRot];
}
