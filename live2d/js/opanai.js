import {Configuration} from "../../node_modules/openai/dist/configuration"
import {OpenAIApi} from "../../node_modules/openai/dist/api"
const apiKey = "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";
const prompt = "what is ai";

const data = {
  prompt: prompt,
//   model:"text-davinci-001"
};

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

fetch("https://api.openai.com/v1/engines/davinci/completions", {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  });
