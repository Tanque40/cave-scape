
export const showError = (errorText: string): void => {
  const errorBoxDiv: HTMLDivElement = document.getElementById('error-box') as HTMLDivElement
  const errorTextElement: HTMLParagraphElement = document.createElement('p')
  errorTextElement.innerText = errorText;
  errorBoxDiv.appendChild(errorTextElement)
  console.log(errorText);
}
