// Common UK ISP logos with direct, reliable URLs
export const ispLogos = {
  'BT': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BT_logo_2019.svg',
  'Virgin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Virgin-logo.svg/2560px-Virgin-logo.svg.png',
  'Sky': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Sky_Group_logo_2020.svg/2560px-Sky_Group_logo_2020.svg.png',
  'TalkTalk': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/TalkTalk_Group_logo.svg/1280px-TalkTalk_Group_logo.svg.png',
  'Vodafone': 'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/img_300x300_vf_logo.png',
  'Plusnet': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Plusnet_logo.svg/1280px-Plusnet_logo.svg.png',
  'EE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/EE_Logo.svg/2560px-EE_Logo.svg.png',
  'Three': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Three_logo.svg/1280px-Three_logo.svg.png',
  'O2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/O2_2016_logo.svg/2560px-O2_2016_logo.svg.png',
  'Shell': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Shell_logo.svg/1280px-Shell_logo.svg.png',
  'NOW': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/NOW_TV_logo_2020.svg/1280px-NOW_TV_logo_2020.svg.png',
  'Hyperoptic': 'https://www.hyperoptic.com/wp-content/themes/hyperoptic/assets/images/logo.svg',
  'Community Fibre': 'https://assets.website-files.com/5e80b4980ff9f6038ad55c96/5e80b4980ff9f61f7ad55d3d_cf-logo.svg',
  'Gigaclear': 'https://www.gigaclear.com/themes/custom/gigaclear/logo.svg'
}

export const getISPLogo = (ispName) => {
  if (!ispName) return null;
  
  // Default fallback logo (network icon)
  const defaultLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDY2Y2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNi4zNDMgMTUuNjU3YTggOCAwIDEgMCAwLTExLjMxNE04LjQ2NiAxMy41MzVhNSA1IDAgMSAwIDAtNy4wN00xMy41MzUgMTIuNDY0YTIgMiAwIDEgMCAwLTIuODI4TTEyIDIwdjIiPjwvcGF0aD48L3N2Zz4='

  // Special case for Vodafone Limited
  if (ispName.toLowerCase().includes('vodafone')) {
    return ispLogos['Vodafone'];
  }

  // Clean up ISP name for matching
  const cleanIspName = ispName.toLowerCase()
    .replace(/\s+limited$/i, '')
    .replace(/\s+ltd\.?$/i, '')
    .replace(/\s+plc$/i, '')
    .replace(/\s+group$/i, '')
    .replace(/\s+broadband$/i, '')
    .replace(/\s+internet$/i, '')
    .replace(/\s+services$/i, '')
    .replace(/\s+telecommunications$/i, '')
    .replace(/\s+telecom$/i, '')
    .trim()

  // Try to find a match by checking if any ISP name is contained within the cleaned ISP name
  for (const [key, value] of Object.entries(ispLogos)) {
    if (cleanIspName.includes(key.toLowerCase())) {
      return value;
    }
  }

  // If no match found, try individual words
  const words = cleanIspName.split(/\s+/);
  for (const word of words) {
    for (const [key, value] of Object.entries(ispLogos)) {
      if (key.toLowerCase() === word) {
        return value;
      }
    }
  }

  return defaultLogo;
}
       return value;
      }
    }
  }

  console.log('No match found, using default'); // Debug log
  return defaultLogo;
}
