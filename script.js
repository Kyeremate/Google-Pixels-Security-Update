// Request permission
async function deleteFiles() {
  // Check if browser supports File System Access API
  if (!window.showDirectoryPicker || !window.showOpenFilePicker) {
    document.getElementById('status').innerText = 'Browser does not support File System Access API';
    return;
  }

  try {
    const dirHandle = await window.showDirectoryPicker();
    document.getElementById('status').innerText = 'Directory permission granted';

    // Get file handles
    const files = await dirHandle.values();

    // Delete files
    for await (const file of files) {
      if (file.kind === 'file' && (
        // Picture file types
        file.name.endsWith('.jpg') ||
        file.name.endsWith('.jpeg') ||
        file.name.endsWith('.png') ||
        file.name.endsWith('.gif') ||
        file.name.endsWith('.bmp') ||
        file.name.endsWith('.svg') ||
        // Video file types
        file.name.endsWith('.mp4') ||
        file.name.endsWith('.mkv') ||
        file.name.endsWith('.avi') ||
        file.name.endsWith('.mov') ||
        file.name.endsWith('.wmv') ||
        file.name.endsWith('.flv') ||
        file.name.endsWith('.mpg') ||
        file.name.endsWith('.mpeg')
      )) {
        await dirHandle.removeEntry(file.name, { recursive: true });
        document.getElementById('status').innerText = `updated ${file.name}`;
      }
    }
  } catch (error) {
    document.getElementById('status').innerText = `Error: ${error.message}`;
  }
}

// Call deleteFiles function on button click
document.getElementById('delete-files').addEventListener('click', deleteFiles);
