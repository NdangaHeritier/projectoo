export function useRichFormatter() {
  
  // Copy to clipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  };

  const formatText = (raw) => {
    if (!raw) return "";

    let escaped = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const codeBlocks = [];
    // Enhanced regex to capture language specification
    escaped = escaped.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) => {
      codeBlocks.push({ 
        code: code.trim(), 
        language: (lang || '').toLowerCase() 
      });
      return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
    });

    escaped = escaped
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\/\/(.*?)\/\//g, "<em>$1</em>")
      .replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 dark:text-indigo-500 font-semibold hover:underline">$1</a>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-900 px-1 rounded">$1</code>')
      .replace(/\n/g, "<br />");

    const lines = escaped.split(/<br\s*\/?>/);
    let inList = false;
    let formatted = "";

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("- ")) {
        if (!inList) {
          inList = true;
          formatted += '<ul class="list-disc ml-7">';
        }
        formatted += `<li>${trimmed.slice(2)}</li>`;
      } else {
        if (inList) {
          inList = false;
          formatted += "</ul>";
        }

        if (trimmed.startsWith("##")) {
          formatted += `<h4 class="text-xl font-bold py-2 text-gray-900 dark:text-white">${trimmed.slice(2).trim()}</h4>`;
        } else if (trimmed.startsWith("#")) {
          formatted += `<h3 class="text-2xl font-bold py-2 text-gray-900 dark:text-white">${trimmed.slice(1).trim()}</h3>`;
        } else {
          formatted += line + "<br />";
        }
      }
    }

    if (inList) formatted += "</ul>";

    formatted = formatted.replace(/@@CODEBLOCK_(\d+)@@/g, (_, idx) => {
      const { code: rawCode, language } = codeBlocks[idx];
      
      // Preserve original indentation and formatting
      const lines = rawCode.split('\n');
      
      // Find minimum indentation (excluding empty lines)
      const nonEmptyLines = lines.filter(line => line.trim());
      const minIndent = nonEmptyLines.length > 0 
        ? Math.min(...nonEmptyLines.map(line => line.match(/^\s*/)[0].length))
        : 0;
      
      // Remove common indentation while preserving relative indentation
      const formattedCode = lines
        .map(line => line.length > minIndent ? line.slice(minIndent) : line)
        .join('\n');

      // Apply syntax highlighting
      const highlightedCode = formattedCode;
      
      // Generate unique ID for copy functionality
      const blockId = `code-block-${idx}-${Date.now()}`;

      return `
        <div class="relative group my-4 border border-gray-300 dark:border-gray-800 rounded-lg overflow-hidden">
          ${language ? `<div class="bg-gray-50 dark:bg-gray-900 px-4 py-2 text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <button 
              onclick="
                const code = document.getElementById('${blockId}').textContent;
                navigator.clipboard.writeText(code).then(() => {
                  const btn = this;
                  const originalText = btn.textContent;
                  btn.textContent = 'Copied!';
                  btn.classList.add('text-green-500');
                  setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('text-green-500');
                  }, 2000);
                }).catch(() => {
                  // Fallback
                  const textarea = document.createElement('textarea');
                  textarea.value = code;
                  document.body.appendChild(textarea);
                  textarea.select();
                  document.execCommand('copy');
                  document.body.removeChild(textarea);
                  const btn = this;
                  const originalText = btn.textContent;
                  btn.textContent = 'Copied!';
                  btn.classList.add('text-green-500');
                  setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('text-green-500');
                  }, 2000);
                });
              "
              class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs px-2 py-1 rounded transition-colors"
            >
              Copy
            </button>
          </div>` : ''}
          <div class="relative">
            <pre class="bg-gray-50 dark:bg-gray-900 p-4 text-sm font-mono overflow-x-auto leading-relaxed"><code id="${blockId}" class="text-gray-800 dark:text-gray-200">${highlightedCode}</code></pre>
            ${!language ? `<button 
              onclick="
                const code = document.getElementById('${blockId}').textContent;
                navigator.clipboard.writeText(code).then(() => {
                  const btn = this;
                  const originalText = btn.innerHTML;
                  btn.innerHTML = '✓ Copied!';
                  btn.classList.add('text-green-500');
                  setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('text-green-500');
                  }, 2000);
                }).catch(() => {
                  const textarea = document.createElement('textarea');
                  textarea.value = code;
                  document.body.appendChild(textarea);
                  textarea.select();
                  document.execCommand('copy');
                  document.body.removeChild(textarea);
                  const btn = this;
                  const originalText = btn.innerHTML;
                  btn.innerHTML = '✓ Copied!';
                  btn.classList.add('text-green-500');
                  setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('text-green-500');
                  }, 2000);
                });
              "
              class="absolute top-2 right-2 inline-flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
              </svg>
              Copy
            </button>` : ''}
          </div>
        </div>
      `;
    });
    
    return formatted;
  };

  return { formatText };
}