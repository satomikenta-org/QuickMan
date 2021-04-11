import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";


export type TargetLanguage = "ts" | "dart"; 


async function quicktypeJSON(targetLanguage: TargetLanguage, jsonString: string) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  await jsonInput.addSource({
    name: "YOUR_RESPONSE_TYPE",
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const option = targetLanguage == 'ts' ? { 'just-types': 'true' } : undefined;
  const indent = targetLanguage == 'ts' ? "&nbsp;&nbsp;": "&nbsp;&nbsp;&nbsp;&nbsp;";
  return await quicktype({
    inputData,
    lang: targetLanguage,
    indentation: indent,
    rendererOptions: option,
  });
}

export async function generate(targetLanguage: TargetLanguage, jsonString: string): Promise<string[]> {
  const { lines: yourType } = await quicktypeJSON(
    targetLanguage,
    jsonString,
  );
  return yourType;
}