// 类型定义
type ListMarker = 'num' | 'dot';

interface ParagraphNode {
  type: 'paragraph';
  text?: string;
}

interface ListItem {
  text: string;
  children?: ListItem[];
}

interface ListNode {
  type: 'list';
  marker: ListMarker;
  children?: ListItem[];
}

interface HeadingNode {
  type: 'heading';
  text?: string;
  children?: Node[];
}

// 根节点类型，可以是标题、段落或列表
export type Node = HeadingNode | ParagraphNode | ListNode;

// Editor 类实现
export default class Editor {
  /**
   * 将Word文档JSON转换为富文本格式
   * @param wordJson Word文档解析后的JSON对象
   * @returns 富文本内容
   */
  static parseWordToRichText(wordJson: Node | Node[]): string {
    let richText = '';

    const parseListItem = (item: ListItem, parentMarker: ListMarker = 'dot') => {
      richText += '<li>';
      if (item.text) {
        richText += item.text;
      }
      if (item.children && item.children.length > 0) {
        const listTag = parentMarker === 'num' ? 'ol' : 'ul';
        richText += `<${listTag}>`;
        item.children.forEach(child => parseListItem(child, parentMarker));
        richText += `</${listTag}>`;
      }
      richText += '</li>';
    };

    const parseNode = (node: Node, headingLevel: number = 1) => {
      if (node.type === 'heading') {
        const level = Math.min(headingLevel, 6);
        richText += `<h${level}>`;
        if (node.text) {
          richText += node.text;
        }
        richText += `</h${level}>`;

        if (node.children && Array.isArray(node.children)) {
          node.children.forEach((child: Node) => {
            parseNode(child, headingLevel + 1);
          });
        }
      }

      else if (node.type === 'list') {
        const listTag = node.marker === 'num' ? 'ol' : 'ul';
        richText += `<${listTag}>`;
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(item => parseListItem(item, node.marker));
        }
        richText += `</${listTag}>`;
      }

      else if (node.type === 'paragraph') {
        richText += '<p>';
        if (node.text) {
          richText += node.text;
        }
        richText += '</p>';
      }
    };

    if (Array.isArray(wordJson)) {
      wordJson.forEach(node => parseNode(node));
    } else {
      parseNode(wordJson);
    }

    return richText;
  }

  static parseHtmlToWord(html: string): Node[] {
    const div = document.createElement('div');
    div.innerHTML = html.trim();

    const result: Node[] = [];
    // 用于跟踪已处理的元素
    const processedElements = new Set<Element>();

    const parseListItems = (listElement: HTMLElement | Element): ListItem[] => {
      const items: ListItem[] = [];

      Array.from(listElement.children).forEach((child) => {
        if (child.tagName === 'LI') {
          const item: ListItem = {
            text: ''
          };

          // 处理列表项的文本和子列表
          let hasChildList = false;
          Array.from(child.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              item.text = (item.text || '') + node.textContent?.trim();
            } else if (
              node.nodeType === Node.ELEMENT_NODE &&
              (node.nodeName === 'UL' || node.nodeName === 'OL')
            ) {
              hasChildList = true;
              item.children = parseListItems(node as HTMLElement);
            }
          });

          // 如果没有子列表，确保文本被正确设置
          if (!hasChildList && child.textContent) {
            item.text = child.textContent.trim();
          }

          items.push(item);
        }
      });

      return items;
    };

    const parseElement = (element: Element): Node | null => {
      // 如果元素已经被处理过，直接返回 null
      if (processedElements.has(element)) {
        return null;
      }

      // 标记元素为已处理
      processedElements.add(element);

      switch (element.tagName) {
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6': {
          const headingNode: HeadingNode = {
            type: 'heading',
            text: element.textContent?.trim() || '',
          };

          const children: Node[] = [];
          let nextElement = element.nextElementSibling;
          const currentLevel = parseInt(element.tagName[1]);

          while (nextElement) {
            const nextTag = nextElement.tagName;
            if (
              nextTag.startsWith('H') &&
              parseInt(nextTag[1]) <= currentLevel
            ) {
              break;
            }

            const childNode = parseElement(nextElement);
            if (childNode) {
              children.push(childNode);
              // 标记已处理的子元素
              processedElements.add(nextElement);
            }
            nextElement = nextElement.nextElementSibling;
          }

          if (children.length > 0) {
            headingNode.children = children;
          }

          return headingNode;
        }

        case 'P': {
          return {
            type: 'paragraph',
            text: element.textContent?.trim() || ''
          };
        }

        case 'UL':
        case 'OL': {
          return {
            type: 'list',
            marker: element.tagName === 'OL' ? 'num' : 'dot',
            children: parseListItems(element)
          };
        }

        default:
          return null;
      }
    };

    // 解析顶层元素
    Array.from(div.children).forEach((element) => {
      const node = parseElement(element);
      if (node) {
        result.push(node);
      }
    });

    return result;
  }
}
