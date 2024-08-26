export const dataURLToBlob = (dataURL: string) => {
  // Split the data URL into its parts
  const [header, data] = dataURL.split(",");

  // Determine the MIME type (e.g., image/png)
  const mime = header.match(/:(.*?);/)![1];

  // Decode the base64 data
  const binary = atob(data);

  // Convert binary string to byte array
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  // Create a Blob with the MIME type and byte array
  return new Blob([array], { type: mime });
};
