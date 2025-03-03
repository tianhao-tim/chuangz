import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap } from "@/datav/types/data-source";

/**
 * Decoration
 */
export class Decoration extends DatavComponent {
	config = {
		global: {
			img: "gif1",
			opacity: 1
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("Decoration", { w: 200, h: 200 });

		this.initData();
	}

	initData() {
		this.apis = {};
		this.apiData = {};
		this.events = {};
		this.actions = {};

		return this;
	}

	async loadData() {}
}

const baseUrl = window.location.origin;

export const presetImages: {
	[key: string]: {
		url: string;
		css: Record<string, string>;
	};
} = {
	gif1: {
		url: `${baseUrl}/decoration/gif1-1920-1080.gif`,
		css: {
			"background-position": "left bottom"
		}
	},
	gif2: {
		url: `${baseUrl}/decoration/gif2-1920-1080.gif`,
		css: {
			"background-position": "center"
		}
	},
	gif3: {
		url: `${baseUrl}/decoration/gif3-1080-824.gif`,
		css: {
			"background-position": "right top"
		}
	},
	gif4: {
		url: `${baseUrl}/decoration/gif4-1080-824.gif`,
		css: {
			"background-position": "right bottom"
		}
	},
	gif5: {
		url: `${baseUrl}/decoration/gif5-1920-1080.gif`,
		css: {
			"background-position": "left top"
		}
	},
	gif6: {
		url: `${baseUrl}/decoration/gif6-1626-356.gif`,
		css: {
			"background-position": "center"
		}
	},
	gif7: {
		url: `${baseUrl}/decoration/gif7-94-1461.gif`,
		css: {
			"background-size": "contain",
			"background-position": "left top"
		}
	},
	gif8: {
		url: `${baseUrl}/decoration/gif8-500-54.gif`,
		css: {
			"background-size": "contain",
			"background-position": "left top"
		}
	},
	gif9: {
		url: `${baseUrl}/decoration/gif9-500-64.gif`,
		css: {
			"background-size": "contain",
			"background-position": "left top"
		}
	},
	gif10: {
		url: `${baseUrl}/decoration/gif10-782-259.gif`,
		css: {
			"background-size": "contain",
			"background-position": "left top"
		}
	},
	gif11: {
		url: `${baseUrl}/decoration/gif11-280-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif12: {
		url: `${baseUrl}/decoration/gif12-254-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif13: {
		url: `${baseUrl}/decoration/gif13-800-171.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif14: {
		url: `${baseUrl}/decoration/gif14-800-103.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif15: {
		url: `${baseUrl}/decoration/gif15-800-143.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif16: {
		url: `${baseUrl}/decoration/gif16-800-154.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif17: {
		url: `${baseUrl}/decoration/gif17-254-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif18: {
		url: `${baseUrl}/decoration/gif18-800-143.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif19: {
		url: `${baseUrl}/decoration/gif19-113-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif20: {
		url: `${baseUrl}/decoration/gif20-840-700.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif21: {
		url: `${baseUrl}/decoration/gif21-368-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif22: {
		url: `${baseUrl}/decoration/gif22-800-103.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif23: {
		url: `${baseUrl}/decoration/gif23-800-86.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif24: {
		url: `${baseUrl}/decoration/gif24-456-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif25: {
		url: `${baseUrl}/decoration/gif25-132-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif26: {
		url: `${baseUrl}/decoration/gif26-184-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif27: {
		url: `${baseUrl}/decoration/gif27-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif28: {
		url: `${baseUrl}/decoration/gif28-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif29: {
		url: `${baseUrl}/decoration/gif29-254-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif30: {
		url: `${baseUrl}/decoration/gif30-500-500.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif31: {
		url: `${baseUrl}/decoration/gif31-1000-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif32: {
		url: `${baseUrl}/decoration/gif32-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif33: {
		url: `${baseUrl}/decoration/gif33-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif34: {
		url: `${baseUrl}/decoration/gif34-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif35: {
		url: `${baseUrl}/decoration/gif35-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif36: {
		url: `${baseUrl}/decoration/gif36-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif37: {
		url: `${baseUrl}/decoration/gif37-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif38: {
		url: `${baseUrl}/decoration/gif38-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif39: {
		url: `${baseUrl}/decoration/gif39-1200-1200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif40: {
		url: `${baseUrl}/decoration/gif40-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif41: {
		url: `${baseUrl}/decoration/gif41-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif42: {
		url: `${baseUrl}/decoration/gif42-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif43: {
		url: `${baseUrl}/decoration/gif43-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif44: {
		url: `${baseUrl}/decoration/gif44-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif45: {
		url: `${baseUrl}/decoration/gif45-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif46: {
		url: `${baseUrl}/decoration/gif46-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif47: {
		url: `${baseUrl}/decoration/gif47-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif48: {
		url: `${baseUrl}/decoration/gif48-300-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif49: {
		url: `${baseUrl}/decoration/gif49-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif50: {
		url: `${baseUrl}/decoration/gif50-800-65.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif51: {
		url: `${baseUrl}/decoration/gif51-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif52: {
		url: `${baseUrl}/decoration/gif52-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif53: {
		url: `${baseUrl}/decoration/gif53-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif54: {
		url: `${baseUrl}/decoration/gif54-800-200.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	},
	gif55: {
		url: `${baseUrl}/decoration/gif55-800-800.png`,
		css: {
			"background-position": "center",
			"background-size": "contain"
		}
	}
};

export default Decoration;
