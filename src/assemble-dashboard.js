import fs from 'fs';

const markupFile = './src/extracted-markup.jsx';
const targetFile = './src/components/Dashboard.jsx';

const markupContent = fs.readFileSync(markupFile, 'utf-8');

// Separate Part 1 and Part 2 from the extracted markup file
const p1Start = markupContent.indexOf('// === JSX Part 1 ===') + '// === JSX Part 1 ==='.length;
const p1End = markupContent.indexOf('// === JSX Part 2 ===');
const p2Start = p1End + '// === JSX Part 2 ==='.length;

let part1JSX = markupContent.substring(p1Start, p1End).trim();
let part2JSX = markupContent.substring(p2Start).trim();

// Clean up some static bindings in the markup that need React replacements:
// 1. onclick="..." needs to become onClick={...}
// 2. onchange="..." needs to become onChange={...}
// 3. onsubmit="..." needs to be handled
// 4. onload="..." should be removed or handled
// 5. value="..." in inputs/textareas should use defaultValue or value with onChange
// 6. style="display: none;" or other displays can be dynamic.

// Replace onclick, onchange, onsubmit in JSX markup
part1JSX = part1JSX
  .replace(/onClick="switchView\(event,\s*'([^']*)'(?:,\s*'([^']*)')?\)"/g, 'onClick={(e) => handleSwitchView(e, "$1", $2)}')
  .replace(/onClick="toggleTodo\((\w+)\)"/g, 'onClick={() => handleToggleTodo($1)}')
  .replace(/onClick="deleteTodo\((\w+)\)"/g, 'onClick={() => handleDeleteTodo($1)}')
  .replace(/onChange="toggleTodo\((\w+)\)"/g, 'onChange={() => handleToggleTodo($1)}')
  .replace(/onClick="changeWorkspaceLanguage\(\)"/g, 'onChange={handleChangeWorkspaceLanguage}') // language select
  .replace(/onChange="changeWorkspaceLanguage\(\)"/g, 'onChange={handleChangeWorkspaceLanguage}')
  .replace(/onClick="toggleWorkspaceConsole\(\)"/g, 'onClick={handleToggleWorkspaceConsole}')
  .replace(/onClick="switchConsoleTab\('([^']*)'\)"/g, 'onClick={() => handleSwitchConsoleTab("$1")}')
  .replace(/onClick="switchWorkspaceTab\('([^']*)'\)"/g, 'onClick={() => handleSwitchWorkspaceTab("$1")}')
  .replace(/onClick="runWorkspaceCode\(\)"/g, 'onClick={handleRunWorkspaceCode}')
  .replace(/onClick="submitWorkspaceCode\(\)"/g, 'onClick={handleSubmitWorkspaceCode}')
  .replace(/onClick="sendWorkspaceCodeToAI\('([^']*)'\)"/g, 'onClick={() => handleSendWorkspaceCodeToAI("$1")}')
  .replace(/onClick="MarkAllLecturesRead\(\)"/g, 'onClick={handleMarkAllLecturesRead}')
  .replace(/onClick="toggleSoundwaves\(\)"/g, 'onClick={handleToggleSoundwaves}')
  .replace(/onSubmit="event\.preventDefault\(\);\s*window\.location\.href\s*=\s*'\/dashboard\.html';"/g, 'onSubmit={(e) => e.preventDefault()}')
  .replace(/href="\/login\.html"/g, 'href="#/login"')
  .replace(/href="\/signup\.html"/g, 'href="#/signup"')
  .replace(/href="\/"/g, 'href="#/"');

part2JSX = part2JSX
  .replace(/onClick="drawer-close"/g, 'onClick={handleCloseDrawer}')
  .replace(/id="drawer-close"/g, 'id="drawer-close" onClick={handleCloseDrawer}');

// Let's create the final file template
const componentContent = `import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../dashboard.css';

// --- Practice Problems & Templates Definition ---
const practiceProblems = [
  {
    id: 1,
    title: "Two Sum",
    number: "1",
    difficulty: "Easy",
    acceptance: "50.1%",
    topics: ["Array", "Hash Table"],
    solved: true,
    description: "Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.<br><br>You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    example: "<strong>Input:</strong> nums = [2,7,11,15], target = 9<br><strong>Output:</strong> [0,1]<br><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].",
    suggestion: "Optimize Two Sum using Hash Map"
  },
  {
    id: 2,
    title: "Add Two Numbers",
    number: "2",
    difficulty: "Medium",
    acceptance: "40.5%",
    topics: ["Linked List", "Math"],
    solved: false,
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    example: "<strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]<br><strong>Output:</strong> [7,0,8]<br><strong>Explanation:</strong> 342 + 465 = 807.",
    suggestion: "Solve Add Two Numbers using linked list node traversal"
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    number: "3",
    difficulty: "Medium",
    acceptance: "33.8%",
    topics: ["Hash Table", "String", "Sliding Window"],
    solved: false,
    description: "Given a string <code>s</code>, find the length of the longest substring without repeating characters.",
    example: "<strong>Input:</strong> s = \\"abcabcbb\\"<br><strong>Output:</strong> 3<br><strong>Explanation:</strong> The answer is \\"abc\\", with the length of 3.",
    suggestion: "Explain sliding window technique for Longest Substring"
  },
  {
    id: 4,
    title: "XML External Entity (XXE) Injection Parser",
    number: "4",
    difficulty: "Hard",
    acceptance: "28.5%",
    topics: ["Security", "XML"],
    solved: false,
    description: "Secure an XML parser configuration against XML External Entity (XXE) injection attacks. Prevent the parser from resolving external entities or loading external DTDs.",
    example: "<strong>Input:</strong> &lt;!DOCTYPE foo [ &lt;!ENTITY xxe SYSTEM \\"file:///etc/passwd\\"&gt; ]&gt;&lt;foo&gt;&amp;xxe;&lt;/foo&gt;<br><strong>Output:</strong> ParserException: External entities are disabled.",
    suggestion: "Scan XML parser code for XXE vulnerabilities"
  },
  {
    id: 5,
    title: "SQL Injection Mitigation in Login Handler",
    number: "5",
    difficulty: "Easy",
    acceptance: "65.2%",
    topics: ["Security", "Database"],
    solved: true,
    description: "Secure a database login query handler against SQL injection attacks. Upgrade concatenating dynamic queries to use parameterized prepared statements.",
    example: "<strong>Input:</strong> username = \\"admin' OR '1'='1\\", password = \\"xyz\\"<br><strong>Output:</strong> Authentication failed (safe prepared query executed).",
    suggestion: "🛡️ Scan login handler for OWASP security flaws"
  },
  {
    id: 6,
    title: "Longest Palindromic Substring",
    number: "6",
    difficulty: "Medium",
    acceptance: "32.4%",
    topics: ["String", "Dynamic Programming"],
    solved: false,
    description: "Given a string <code>s</code>, return the longest palindromic substring in <code>s</code>.",
    example: "<strong>Input:</strong> s = \\"babad\\"<br><strong>Output:</strong> \\"bab\\" (or \\"aba\\")",
    suggestion: "Explain dynamic programming formulation for longest palindromic substring"
  },
  {
    id: 7,
    title: "Buffer Overflow Check in C-String Copy",
    number: "7",
    difficulty: "Hard",
    acceptance: "18.2%",
    topics: ["Security", "C++"],
    solved: false,
    description: "Audit a C++ program that copies user input into a fixed-size character array. Prevent buffer overflow exploits by replacing standard unsecure copy functions (like <code>strcpy</code>) with secure alternatives.",
    example: "<strong>Input:</strong> input = \\"A\\" * 100, buffer_size = 16<br><strong>Output:</strong> CompileError/ExecutionBlocked: Safe copy bound exceeded.",
    suggestion: "Audit C++ code for strcpy buffer overflow vulnerabilities"
  },
  {
    id: 8,
    title: "Regular Expression Matching",
    number: "8",
    difficulty: "Hard",
    acceptance: "28.0%",
    topics: ["String", "Dynamic Programming", "Recursion"],
    solved: false,
    description: "Implement regular expression matching with support for <code>'.'</code> and <code>'*'</code>. '.' matches any single character, and '*' matches zero or more of the preceding element.",
    example: "<strong>Input:</strong> s = \\"aa\\", p = \\"a*\\"<br><strong>Output:</strong> true<br><strong>Explanation:</strong> '*' means zero or more of the preceding element 'a'.",
    suggestion: "Explain regular expression matching DP state transitions"
  }
];

const problemTemplates = {
  1: {
    python: `class Solution:\\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\\n        # Write your Python solution here\\n        pass\\n`,
    javascript: `/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nvar twoSum = function(nums, target) {\\n    // Write your JavaScript solution here\\n    return [];\\n};\\n`,
    cpp: `class Solution {\\npublic:\\n    vector<int> twoSum(vector<int>& nums, int target) {\\n        // Write your C++ solution here\\n        return {};\\n    }\\n};\\n`,
    java: `class Solution {\\n    public int[] twoSum(int[] nums, int target) {\\n        // Write your Java solution here\\n        return new int[0];\\n    }\\n}\\n`
  },
  2: {
    python: `class Solution:\\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\\n        # Write your Python solution here\\n        pass\\n`,
    javascript: `var addTwoNumbers = function(l1, l2) {\\n    // Write your JavaScript solution here\\n    return null;\\n};\\n`,
    cpp: `class Solution {\\npublic:\\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\\n        // Write your C++ solution here\\n        return nullptr;\\n    }\\n};\\n`,
    java: `class Solution {\\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n        // Write your Java solution here\\n        return null;\\n    }\\n}\\n`
  },
  3: {
    python: `class Solution:\\n    def lengthOfLongestSubstring(self, s: str) -> int:\\n        # Write your Python solution here\\n        return 0\\n`,
    javascript: `var lengthOfLongestSubstring = function(s) {\\n    // Write your JavaScript solution here\\n    return 0;\\n};\\n`,
    cpp: `class Solution {\\npublic:\\n    int lengthOfLongestSubstring(string s) {\\n        // Write your C++ solution here\\n        return 0;\\n    }\\n};\\n`,
    java: `class Solution {\\n    public int lengthOfLongestSubstring(String s) {\\n        // Write your Java solution here\\n        return 0;\\n    }\\n}\\n`
  },
  4: {
    python: `import xml.etree.ElementTree as ET\\n\\nclass XMLParser:\\n    def parse_xml_safely(self, xml_string: str) -> ET.Element:\\n        # Prevent XML External Entity (XXE) injection attacks\\n        # Write your secure Python code here\\n        pass\\n`,
    javascript: `const libxmljs = require('libxmljs');\\n\\nfunction parseXmlSafely(xmlString) {\\n    // Prevent XML External Entity (XXE) injection attacks\\n    // Write your secure JavaScript code here\\n}\\n`,
    cpp: `#include <xercesc/parsers/XercesDOMParser.hpp>\\nusing namespace xercesc;\\n\\nclass SecureXMLParser {\\npublic:\\n    void parseXMLSafely(const char* xmlContent) {\\n        // Prevent XML External Entity (XXE) injection attacks\\n        // Write your secure C++ code here\\n    }\\n};\\n`,
    java: `import javax.xml.parsers.DocumentBuilderFactory;\\n\\nclass SecureXMLParser {\\n    public void parseXMLSafely(String xmlContent) throws Exception {\\n        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();\\n        // Prevent XML External Entity (XXE) injection attacks\\n        // Configure dbf to disable external DTDs and entities\\n        \\n    }\\n}\\n`
  },
  5: {
    python: `import sqlite3\\n\\nclass LoginHandler:\\n    def authenticate_user(self, conn: sqlite3.Connection, user: str, password_hash: str) -> bool:\\n        # Prevent SQL injection by using prepared statements\\n        # Write your secure Python code here\\n        pass\\n`,
    javascript: `const mysql = require('mysql2');\\n\\nfunction authenticateUser(connection, username, passwordHash) {\\n    // Prevent SQL injection by using parameterized queries\\n    // Write your secure JavaScript code here\\n}\\n`,
    cpp: `#include <sqlite3.h>\\n\\nclass LoginHandler {\\npublic:\\n    bool authenticateUser(sqlite3* db, const char* user, const char* passHash) {\\n        // Prevent SQL injection by using parameterized prepared statements\\n        // Write your secure C++ code here\\n        return false;\\n    }\\n};\\n`,
    java: `import java.sql.*;\\n\\nclass LoginHandler {\\n    public boolean authenticateUser(Connection conn, String username, String passwordHash) throws SQLException {\\n        // Prevent SQL injection by using prepared statements\\n        // Write your secure Java code here\\n        return false;\\n    }\\n}\\n`
  },
  6: {
    python: `class Solution:\\n    def longestPalindrome(self, s: str) -> str:\\n        # Write your Python solution here\\n        return ""\\n`,
    javascript: `var longestPalindrome = function(s) {\\n    // Write your JavaScript solution here\\n    return "";\\n};\\n`,
    cpp: `class Solution {\\npublic:\\n    string longestPalindrome(string s) {\\n        // Write your C++ solution here\\n        return "";\\n    }\\n};\\n`,
    java: `class Solution {\\n    public String longestPalindrome(String s) {\\n        // Write your Java solution here\\n        return "";\\n    }\\n}\\n`
  },
  7: {
    python: `def safe_copy(src: str, dest_limit: int) -> str:\\n    # Verify memory copy boundaries\\n    # Write your secure Python bounds check here\\n    pass\\n`,
    javascript: `function safeBufferCopy(srcString, destLimit) {\\n    // Verify memory copy boundaries\\n    // Write your secure JavaScript validator here\\n}\\n`,
    cpp: `#include <cstring>\\n\\nclass SafeMemoryCopy {\\npublic:\\n    void safeStringCopy(char* dest, const char* src, size_t destSize) {\\n        // Prevent buffer overflow vulnerabilities\\n        // Write your secure C++ code here\\n    }\\n};\\n`,
    java: `public class SafeMemoryCopy {\\n    public static byte[] safeBufferCopy(byte[] src, int destSize) {\\n        // Verify byte buffer boundary checks\\n        // Write your secure Java code here\\n        return new byte[0];\\n    }\\n}\\n`
  },
  8: {
    python: `class Solution:\\n    def isMatch(self, s: str, p: str) -> bool:\\n        # Write your Python solution here\\n        return False\\n`,
    javascript: `var isMatch = function(s, p) {\\n    // Write your JavaScript solution here\\n    return false;\\n};\\n`,
    cpp: `class Solution {\\npublic:\\n    bool isMatch(string s, string p) {\\n        // Write your C++ solution here\\n        return false;\\n    }\\n};\\n`,
    java: `class Solution {\\n    public boolean isMatch(String s, String p) {\\n        // Write your Java solution here\\n        return false;\\n    }\\n}\\n`
  }
};

const problemSolutions = {
  1: {
    explanation: "The optimal solution is to use a Hash Map (dictionary) to store each number and its index. For each number, calculate its complement (target - number) and check if it already exists in the Map. This achieves a Time Complexity of <b>O(N)</b> and Space Complexity of <b>O(N)</b>.",
    snippet: "class Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\n        seen = {}\\n        for i, num in enumerate(nums):\\n            complement = target - num\\n            if complement in seen:\\n                return [seen[complement], i]\\n            seen[num] = i\\n        return []"
  },
  2: {
    explanation: "Initialize a dummy node as the head of the output linked list. Maintain a carry variable initialized to 0. Traverse both input lists, sum up the values of current nodes and carry, update the carry, and append a new node with the value `sum % 10` to the result list.",
    snippet: "class Solution:\\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\\n        dummy = ListNode(0)\\n        curr = dummy\\n        carry = 0\\n        while l1 or l2 or carry:\\n            val1 = l1.val if l1 else 0\\n            val2 = l2.val if l2 else 0\\n            total = val1 + val2 + carry\\n            carry = total // 10\\n            curr.next = ListNode(total % 10)\\n            curr = curr.next\\n            l1 = l1.next if l1 else None\\n            l2 = l2.next if l2 else None\\n        return dummy.next"
  },
  3: {
    explanation: "Use a sliding window technique with a hash map to keep track of the last seen index of each character. Move the right pointer to expand the window, and if a duplicate is found, move the left pointer to `max(left, last_seen[char] + 1)`.",
    snippet: "class Solution:\\n    def lengthOfLongestSubstring(self, s: str) -> int:\\n        char_map = {}\\n        left = max_len = 0\\n        for right, char in enumerate(s):\\n            if char in char_map:\\n                left = max(left, char_map[char] + 1)\\n            char_map[char] = right\\n            max_len = max(max_len, right - left + 1)\\n        return max_len"
  },
  4: {
    explanation: "To mitigate XXE vulnerabilities, configure the XML parser to explicitly disable the loading of external DTDs and resolution of external entities. In Java, setting features on standard XML parsers guarantees safety.",
    snippet: "// Java secure implementation:\\nDocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();\\ndbf.setFeature(\\"http://apache.org/xml/features/disallow-doctype-decl\\", true);\\ndbf.setFeature(\\"http://xml.org/sax/features/external-general-entities\\", false);\\ndbf.setFeature(\\"http://xml.org/sax/features/external-parameter-entities\\", false);"
  },
  5: {
    explanation: "Concatenating strings to construct database queries allows SQL injections. Parameterized queries (prepared statements) ensure the database compiles the SQL structure first, and treats parameter inputs strictly as values rather than executable code.",
    snippet: "# Python secure implementation:\\nquery = \\"SELECT * FROM users WHERE username = ? AND password = ?\\"\\ncursor.execute(query, (username, password_hash))\\nreturn cursor.fetchone() is not None"
  },
  6: {
    explanation: "A string is palindromic if its outer characters match and its inner substring is also palindromic. We can use Dynamic Programming to solve this by building a table dp[i][j] or by expanding around center nodes. Expanding around centers is faster: O(N^2) time and O(1) space.",
    snippet: "class Solution:\\n    def longestPalindrome(self, s: str) -> str:\\n        res = \\"\\"\\n        for i in range(len(s)):\\n            tmp1 = self.helper(s, i, i)\\n            if len(tmp1) > len(res): res = tmp1\\n            tmp2 = self.helper(s, i, i + 1)\\n            if len(tmp2) > len(res): res = tmp2\\n        return res"
  },
  7: {
    explanation: "Unbounded copy functions like strcpy or sprintf do not check the length of the source string, allowing it to overwrite adjacent memory. Use safe bounded copy functions like strncpy or std::string objects in C++.",
    snippet: "// C++ secure implementation:\\n#include <string>\\n#include <algorithm>\\n\\nvoid safeStringCopy(char* dest, const char* src, size_t destSize) {\\n    if (destSize == 0) return;\\n    size_t copyLen = std::min(strlen(src), destSize - 1);\\n    memcpy(dest, src, copyLen);\\n    dest[copyLen] = '\\\\0';\\n}"
  },
  8: {
    explanation: "This problem can be solved using Dynamic Programming. Define a 2D grid dp[i][j] where dp[i][j] is true if s[i:] matches p[j:]. The transition depends on whether the next character in pattern p is '*' or not.",
    snippet: "class Solution:\\n    def isMatch(self, s: str, p: str) -> bool:\\n        dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]\\n        dp[-1][-1] = True\\n        # ... loop dynamic programming logic"
  }
};

// --- Functional Code Runner Sandbox & Utilities ---
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function parseConsoleTestCase(tcString) {
  if (!tcString) return {};
  let jsExpr = tcString
    .replace(/"([^"]*)"\\s*\\*\\s*(\\d+)/g, '"$1".repeat($2)')
    .replace(/'([^']*)'\\s*\\*\\s*(\\d+)/g, "'$1'.repeat($2)")
    .replace(/\\bNone\\b/g, 'null')
    .replace(/\\bTrue\\b/g, 'true')
    .replace(/\\bFalse\\b/g, 'false');
  
  const allowedVars = ['nums', 'target', 'l1', 'l2', 's', 'p', 'xml', 'username', 'password', 'input', 'buffer_size', 'xml_string', 'xmlString', 'xmlContent', 'connection', 'usernameHash', 'passwordHash', 'db', 'user', 'passHash', 'conn', 'src', 'dest_size', 'destLimit', 'srcString', 'dest'];
  
  let decls = allowedVars.map(v => `let ${v} = undefined;`).join(' ');
  let returnObj = `return { ${allowedVars.join(', ')} };`;
  
  try {
    let fn = new Function(`${decls} try { ${jsExpr}; } catch(e){} ${returnObj}`);
    let result = fn();
    let parsed = {};
    for (let k in result) {
      if (result[k] !== undefined) {
        parsed[k] = result[k];
      }
    }
    return parsed;
  } catch (e) {
    console.error("Error parsing testcase:", e);
    return {};
  }
}

function unindentCode(code) {
  let lines = code.split('\\n');
  let minIndent = Infinity;
  for (let line of lines) {
    if (line.trim() && !line.trim().startsWith('#')) {
      let indent = line.length - line.trimStart().length;
      if (indent < minIndent) minIndent = indent;
    }
  }
  if (minIndent > 0 && minIndent !== Infinity) {
    return lines.map(line => line.slice(minIndent)).join('\\n');
  }
  return code;
}

function transpilePythonToJS(pythonCode) {
  let lines = pythonCode.split('\\n');
  let jsLines = [];
  let indentStack = [0];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let trimmed = line.trim();
    if (!trimmed) {
      jsLines.push('');
      continue;
    }
    if (trimmed.startsWith('#')) {
      jsLines.push('//' + trimmed.slice(1));
      continue;
    }
    
    let indent = line.length - line.trimStart().length;
    
    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      let pad = ' '.repeat(indentStack[indentStack.length - 1]);
      jsLines.push(pad + '}');
    }
    
    let isBlock = trimmed.endsWith(':');
    let lineContent = isBlock ? trimmed.slice(0, -1) : trimmed;
    
    if (lineContent.startsWith('def ')) {
      lineContent = lineContent.replace(/\\bdef\\b/, 'function');
      lineContent = lineContent.replace(/\\bself\\s*,\\s*/, '').replace(/\\bself\\b/, '');
      lineContent = lineContent.replace(/->\\s*[A-Za-z0-9_\\[\\]\\s|]+$/, '');
      
      let openParen = lineContent.indexOf('(');
      let closeParen = lineContent.lastIndexOf(')');
      if (openParen !== -1 && closeParen !== -1) {
        let params = lineContent.slice(openParen + 1, closeParen);
        let cleanedParams = params.split(',').map(p => {
          let parts = p.split(':');
          return parts[0].trim();
        }).join(', ');
        lineContent = lineContent.slice(0, openParen + 1) + cleanedParams + lineContent.slice(closeParen);
      }
    }
    
    lineContent = lineContent
      .replace(/\\bTrue\\b/g, 'true')
      .replace(/\\bFalse\\b/g, 'false')
      .replace(/\\bNone\\b/g, 'null')
      .replace(/\\band\\b/g, '&&')
      .replace(/\\bor\\b/g, '||')
      .replace(/\\bnot\\b/g, '!')
      .replace(/\\belif\\b/g, 'else if');
      
    lineContent = lineContent.replace(/([A-Za-z0-9_.]+)\\s*\\/\\/\\s*([A-Za-z0-9_.]+)/g, 'Math.floor($1 / $2)');
    
    let enumMatch = lineContent.match(/for\\s+(\\w+)\\s*,\\s*(\\w+)\\s+in\\s+enumerate\\((.+)\\)/);
    if (enumMatch) {
      lineContent = `for (let [\${enumMatch[1]}, \${enumMatch[2]}] of enumerate(\${enumMatch[3]}))`;
    } else {
      let rangeLenMatch = lineContent.match(/for\\s+(\\w+)\\s+in\\s+range\\(len\\((.+)\\)\\)/);
      if (rangeLenMatch) {
        lineContent = `for (let \${rangeLenMatch[1]} = 0; \${rangeLenMatch[1]} < len(\${rangeLenMatch[2]}); \${rangeLenMatch[1]}++)`;
      } else {
        let rangeMatch = lineContent.match(/for\\s+(\\w+)\\s+in\\s+range\\((.+)\\)/);
        if (rangeMatch) {
          lineContent = `for (let \${rangeMatch[1]} of range(\${rangeMatch[2]}))`;
        } else {
          let inMatch = lineContent.match(/for\\s+(\\w+)\\s+in\\s+(.+)/);
          if (inMatch) {
            lineContent = `for (let \${inMatch[1]} of \${inMatch[2]})`;
          }
        }
      }
    }

    let inConditionMatch = lineContent.match(/if\\s+(.+)\\s+in\\s+(.+)/);
    if (inConditionMatch) {
      lineContent = `if (\${inConditionMatch[2]}.hasOwnProperty ? \${inConditionMatch[2]}.hasOwnProperty(\${inConditionMatch[1]}) : (\${inConditionMatch[1]} in \${inConditionMatch[2]}))`;
    }

    lineContent = lineContent.replace(/#.*$/, '');

    let pad = ' '.repeat(indent);
    if (isBlock) {
      jsLines.push(pad + lineContent + ' {');
      indentStack.push(indent + 4);
    } else {
      jsLines.push(pad + lineContent + ';');
    }
  }
  
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
  }
  
  return jsLines.join('\\n');
}

function stripClassDefinition(code) {
  if (!code) return "";
  let classRegex = /class\\s+\\w+\\s*(?::\\s*(?:public|private|protected)\\s+\\w+)?\\s*\\{/;
  let match = code.match(classRegex);
  if (!match) return code;
  
  let startIndex = match.index;
  let braceIndex = startIndex + match[0].length - 1;
  
  let depth = 1;
  let endIndex = -1;
  for (let i = braceIndex + 1; i < code.length; i++) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}') {
      depth--;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  if (endIndex !== -1) {
    return code.slice(braceIndex + 1, endIndex);
  }
  return code;
}

function transpileCppToJS(codeText) {
  let code = codeText;
  code = code.replace(/public\\s*:/g, '');
  code = code.replace(/private\\s*:/g, '');
  code = code.replace(/\\bnullptr\\b/g, 'null');
  code = code.replace(/\\bNULL\\b/g, 'null');
  code = code.replace(/\\bstd::/g, '');
  
  code = code.replace(/unordered_map\\s*<[^>]+>\\s+(\\w+)\\s*;/g, 'let $1 = {};');
  code = code.replace(/map\\s*<[^>]+>\\s+(\\w+)\\s*;/g, 'let $1 = {};');
  code = code.replace(/vector\\s*<[^>]+>\\s+(\\w+)\\s*;/g, 'let $1 = [];');
  code = code.replace(/return\\s*\\{([^}]+)\\}\\s*;/g, 'return [$1];');
  
  const cppTypes = ['vector\\\\s*<\\\\s*int\\\\s*>&?', 'vector\\\\s*<\\\\s*int\\\\s*>', 'int', 'string', 'ListNode\\\\s*\\\\*?', 'bool', 'void', 'size_t', 'char\\\\s*\\\\*', 'const char\\\\s*\\\\*'];
  cppTypes.forEach(t => {
    let reSig = new RegExp('\\\\b' + t + '\\\\b', 'g');
    code = code.replace(reSig, '');
  });
  
  code = code.replace(/(\\w+)\\s*\\(([^)]*)\\)\\s*\\{/g, 'function $1($2) {');
  return code;
}

function transpileJavaToJS(codeText) {
  let code = codeText;
  code = code.replace(/Map\\s*<[^>]+>\\s+(\\w+)\\s*=\\s*new\\s+HashMap\\s*<[^>]*>\\s*\\(\\s*\\)\\s*;/g, 'let $1 = new Map();');
  code = code.replace(/HashMap\\s*<[^>]+>\\s+(\\w+)\\s*=\\s*new\\s+HashMap\\s*<[^>]*>\\s*\\(\\s*\\)\\s*;/g, 'let $1 = new Map();');
  code = code.replace(/\\b(\\w+)\\.put\\(([^,]+),\\s*([^)]+)\\)/g, '$1.set($2, $3)');
  code = code.replace(/\\b(\\w+)\\.containsKey\\(([^)]+)\\)/g, '$1.has($2)');
  code = code.replace(/\\b(\\w+)\\.get\\(([^)]+)\\)/g, '$1.get($2)');
  code = code.replace(/new\\s+\\w+\\[\\]\\s*\\{([^}]+)\\}/g, '[$1]');
  code = code.replace(/new\\s+\\w+\\[\\d+\\]/g, '[]');
  
  const javaTypes = ['public', 'private', 'protected', 'static', 'final', 'int\\\\[\\\\]', 'int', 'String', 'ListNode', 'boolean', 'double', 'float', 'void'];
  javaTypes.forEach(t => {
    let re = new RegExp('\\\\b' + t + '\\\\b', 'g');
    code = code.replace(re, '');
  });
  
  code = code.replace(/(\\w+)\\s*\\(([^)]*)\\)\\s*\\{/g, 'function $1($2) {');
  return code;
}

function transpileToJS(codeText, language, problemId) {
  let code = codeText;
  if (language === 'python') {
    code = code.replace(/class\\s+\\w+(\\([^\\)]+\\))?\\s*:/g, '');
    code = unindentCode(code);
    return transpilePythonToJS(code);
  }
  if (language === 'cpp') {
    code = stripClassDefinition(code);
    return transpileCppToJS(code);
  }
  if (language === 'java') {
    code = stripClassDefinition(code);
    return transpileJavaToJS(code);
  }
  return code;
}

function isXXESecure(codeText) {
  const lowercaseCode = codeText.toLowerCase();
  return (
    lowercaseCode.includes("disallow-doctype-decl") ||
    lowercaseCode.includes("external-general-entities") ||
    lowercaseCode.includes("external-parameter-entities") ||
    lowercaseCode.includes("resolve_entities=false") ||
    lowercaseCode.includes("forbid_dtd=true") ||
    lowercaseCode.includes("setfeature") ||
    lowercaseCode.includes("dbf") ||
    lowercaseCode.includes("parse_xml_safely") ||
    lowercaseCode.includes("defusedxml") ||
    lowercaseCode.includes("noent: false") ||
    lowercaseCode.includes("entityresolution") ||
    lowercaseCode.includes("disabledefaultentityresolution")
  );
}

function isSQLISecure(codeText) {
  const lowercaseCode = codeText.toLowerCase();
  return (
    lowercaseCode.includes("?") ||
    lowercaseCode.includes("prepare") ||
    lowercaseCode.includes("prepared") ||
    lowercaseCode.includes("parameterized") ||
    (lowercaseCode.includes("db.execute") && lowercaseCode.includes(",")) ||
    (lowercaseCode.includes("execute") && lowercaseCode.includes(",") && !lowercaseCode.includes("+") && !lowercaseCode.includes("%") && !lowercaseCode.includes("{"))
  );
}

function isBufferOverflowSecure(codeText) {
  const lowercaseCode = codeText.toLowerCase();
  return (
    lowercaseCode.includes("strncpy") ||
    lowercaseCode.includes("memcpy") ||
    lowercaseCode.includes("min") ||
    lowercaseCode.includes("destsize") ||
    lowercaseCode.includes("dest_limit") ||
    lowercaseCode.includes("sizeof") ||
    lowercaseCode.includes("safe_copy") ||
    lowercaseCode.includes("safebuffercopy")
  );
}

function isEqual(actual, expected) {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) return false;
    if (actual.length !== expected.length) return false;
    let sortedActual = [...actual].sort((a,b)=>a-b);
    let sortedExpected = [...expected].sort((a,b)=>a-b);
    return sortedActual.every((val, idx) => val === sortedExpected[idx]);
  }
  return actual === expected;
}

function isMatchExpected(actual, expected) {
  if (Array.isArray(expected)) {
    if (typeof actual === "string" && expected.some(exp => exp === actual)) {
      return true;
    }
    return isEqual(actual, expected);
  }
  return actual === expected;
}

const ListNodeStr = `
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }
`;

const listHelpersStr = `
  function arrayToList(arr) {
    if (!arr || arr.length === 0) return null;
    let dummy = new ListNode(0);
    let curr = dummy;
    for (let val of arr) {
      curr.next = new ListNode(val);
      curr = curr.next;
    }
    return dummy.next;
  }

  function listToArray(head) {
    let arr = [];
    let curr = head;
    while (curr) {
      arr.push(curr.val);
      curr = curr.next;
    }
    return arr;
  }
`;

const pythonHelpersStr = `
  function len(obj) {
    if (obj === null || obj === undefined) return 0;
    return obj.length !== undefined ? obj.length : (obj.size !== undefined ? obj.size : Object.keys(obj).length);
  }

  function min(...args) {
    if (args.length === 1 && Array.isArray(args[0])) return Math.min(...args[0]);
    return Math.min(...args);
  }

  function max(...args) {
    if (args.length === 1 && Array.isArray(args[0])) return Math.max(...args[0]);
    return Math.max(...args);
  }

  function range(start, stop, step) {
    if (stop === undefined) {
      stop = start;
      start = 0;
    }
    step = step || 1;
    let result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }
    return result;
  }

  function enumerate(arr) {
    if (!arr) return [];
    return arr.map((val, idx) => [idx, val]);
  }
`;

function executeUserCode(codeText, language, problemId, inputs) {
  if (problemId === 4) {
    let inputXml = inputs.xml || inputs.xml_string || inputs.xmlString || inputs.xmlContent || "";
    let secure = isXXESecure(codeText);
    if (inputXml.includes("<!DOCTYPE") || inputXml.includes("<!ENTITY") || inputXml.includes("SYSTEM")) {
      if (secure) {
        return "ParserException: External entities are disabled.";
      } else {
        return "xml_content = '<foo>admin:x:0:0:root:/root:/bin/bash</foo>' (XXE Leak Success)";
      }
    } else {
      return inputXml.replace(/<[^>]+>/g, "").trim() || inputXml;
    }
  }
  
  if (problemId === 5) {
    let uName = inputs.username || "";
    let pWord = inputs.password || "";
    let secure = isSQLISecure(codeText);
    let isInjection = uName.includes("'") || uName.toLowerCase().includes("or") || pWord.includes("'");
    if (isInjection) {
      if (secure) {
        return "Authentication failed (Safe prepared statement executed)";
      } else {
        return "User Logged In: admin (SQL Injection vulnerability triggered)";
      }
    } else {
      if (uName === "admin" && (pWord === "password123" || pWord === "xyz")) {
        return "User Logged In: admin";
      } else {
        return "Authentication failed";
      }
    }
  }
  
  if (problemId === 7) {
    let srcVal = inputs.input || inputs.src || inputs.srcString || "";
    let bufSize = inputs.buffer_size || inputs.destLimit || inputs.destSize || 16;
    let secure = isBufferOverflowSecure(codeText);
    if (srcVal.length >= bufSize) {
      if (secure) {
        return "CompileError/ExecutionBlocked: Safe copy bound exceeded.";
      } else {
        return "Segmentation Fault (Buffer Overflow Success)";
      }
    } else {
      return srcVal;
    }
  }

  let jsCode = transpileToJS(codeText, language, problemId);
  
  let checkNames = [
    'twoSum', 'addTwoNumbers', 'lengthOfLongestSubstring', 
    'parseXmlSafely', 'parseXMLSafely', 'parse_xml_safely',
    'authenticateUser', 'authenticate_user',
    'longestPalindrome',
    'safeBufferCopy', 'safeStringCopy', 'safe_copy',
    'isMatch'
  ];

  let findFunctionStr = `
    let fn = null;
    const names = \${JSON.stringify(checkNames)};
    for (let name of names) {
      try {
        let val = eval(name);
        if (typeof val === "function") {
          fn = val;
          break;
        }
      } catch(e){}
    }
    if (!fn) {
      const classNames = ["Solution", "XMLParser", "SecureXMLParser", "LoginHandler", "SafeMemoryCopy"];
      for (let cName of classNames) {
        try {
          let Cls = eval(cName);
          if (typeof Cls === "function") {
            let inst = new Cls();
            for (let name of names) {
              if (typeof inst[name] === "function") {
                fn = inst[name].bind(inst);
                break;
              }
            }
          }
        } catch(e){}
        if (fn) break;
      }
    }
    return fn;
  `;

  let wrappedCode = ListNodeStr + "\\n" + listHelpersStr + "\\n" + pythonHelpersStr + "\\n" + jsCode + "\\n" + findFunctionStr;
  
  let fn = eval("(function() {\\n" + wrappedCode + "\\n})()");
  if (!fn) {
    throw new Error("Could not find the target entry function/method in your code.");
  }
  
  if (problemId === 1) {
    return fn(inputs.nums, inputs.target);
  }
  if (problemId === 2) {
    let list1 = arrayToList(inputs.l1);
    let list2 = arrayToList(inputs.l2);
    let resList = fn(list1, list2);
    return listToArray(resList);
  }
  if (problemId === 3) {
    return fn(inputs.s);
  }
  if (problemId === 6) {
    return fn(inputs.s);
  }
  if (problemId === 8) {
    return fn(inputs.s, inputs.p);
  }
  
  throw new Error("Unknown problem ID " + problemId);
}

function getReferenceOutput(problemId, inputs) {
  if (problemId === 1) {
    let nums = inputs.nums || [];
    let target = inputs.target || 0;
    let seen = {};
    for (let i = 0; i < nums.length; i++) {
      let complement = target - nums[i];
      if (seen.hasOwnProperty(complement)) {
        return [seen[complement], i];
      }
      seen[nums[i]] = i;
    }
    return [];
  }
  if (problemId === 2) {
    let l1 = inputs.l1 || [];
    let l2 = inputs.l2 || [];
    let carry = 0;
    let result = [];
    let i = 0, j = 0;
    while (i < l1.length || j < l2.length || carry) {
      let val1 = i < l1.length ? l1[i] : 0;
      let val2 = j < l2.length ? l2[j] : 0;
      let total = val1 + val2 + carry;
      carry = Math.floor(total / 10);
      result.push(total % 10);
      i++;
      j++;
    }
    return result;
  }
  if (problemId === 3) {
    let s = inputs.s || "";
    let charMap = {};
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
      let char = s[right];
      if (charMap.hasOwnProperty(char)) {
        left = Math.max(left, charMap[char] + 1);
      }
      charMap[char] = right;
      maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
  }
  if (problemId === 4) {
    let inputXml = inputs.xml || inputs.xml_string || inputs.xmlString || inputs.xmlContent || "";
    if (inputXml.includes("<!DOCTYPE") || inputXml.includes("<!ENTITY") || inputXml.includes("SYSTEM")) {
      return "ParserException: External entities are disabled.";
    }
    return inputXml.replace(/<[^>]+>/g, "").trim() || inputXml;
  }
  if (problemId === 5) {
    let uName = inputs.username || "";
    let pWord = inputs.password || "";
    let isInjection = uName.includes("'") || uName.toLowerCase().includes("or") || pWord.includes("'");
    if (isInjection) {
      return "Authentication failed (Safe prepared statement executed)";
    }
    if (uName === "admin" && (pWord === "password123" || pWord === "xyz")) {
      return "User Logged In: admin";
    }
    return "Authentication failed";
  }
  if (problemId === 6) {
    let s = inputs.s || "";
    if (!s) return "";
    let start = 0, end = 0;
    function expandAroundCenter(left, right) {
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
      }
      return right - left - 1;
    }
    for (let i = 0; i < s.length; i++) {
      let len1 = expandAroundCenter(i, i);
      let len2 = expandAroundCenter(i, i + 1);
      let len = Math.max(len1, len2);
      if (len > end - start) {
        start = i - Math.floor((len - 1) / 2);
        end = i + Math.floor(len / 2);
      }
    }
    return s.slice(start, end + 1);
  }
  if (problemId === 7) {
    let srcVal = inputs.input || inputs.src || inputs.srcString || "";
    let bufSize = inputs.buffer_size || inputs.destLimit || inputs.destSize || 16;
    if (srcVal.length >= bufSize) {
      return "CompileError/ExecutionBlocked: Safe copy bound exceeded.";
    }
    return srcVal;
  }
  if (problemId === 8) {
    let s = inputs.s || "";
    let p = inputs.p || "";
    let dp = Array(s.length + 1).fill(null).map(() => Array(p.length + 1).fill(false));
    dp[s.length][p.length] = true;
    for (let i = s.length; i >= 0; i--) {
      for (let j = p.length - 1; j >= 0; j--) {
        let firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
        if (j + 1 < p.length && p[j + 1] === '*') {
          dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
        } else {
          dp[i][j] = firstMatch && dp[i + 1][j + 1];
        }
      }
    }
    return dp[0][0];
  }
  return null;
}

const problemTestSuites = {
  1: [
    { inputs: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
    { inputs: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
    { inputs: { nums: [3, 3], target: 6 }, expected: [0, 1] }
  ],
  2: [
    { inputs: { l1: [2, 4, 3], l2: [5, 6, 4] }, expected: [7, 0, 8] },
    { inputs: { l1: [0], l2: [0] }, expected: [0] },
    { inputs: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] }, expected: [8, 9, 9, 9, 0, 0, 0, 1] }
  ],
  3: [
    { inputs: { s: "abcabcbb" }, expected: 3 },
    { inputs: { s: "bbbbb" }, expected: 1 },
    { inputs: { s: "pwwkew" }, expected: 3 },
    { inputs: { s: "" }, expected: 0 }
  ],
  4: [
    { inputs: { xml: "<foo>bar</foo>" }, expected: "bar" },
    { inputs: { xml: "<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \\"file:///etc/passwd\\"> ]><foo>&xxe;</foo>" }, expected: "ParserException: External entities are disabled." },
    { inputs: { xml: "<foo>hello world</foo>" }, expected: "hello world" }
  ],
  5: [
    { inputs: { username: "admin", password: "password123" }, expected: "User Logged In: admin" },
    { inputs: { username: "admin' OR '1'='1", password: "xyz" }, expected: "Authentication failed (Safe prepared statement executed)" },
    { inputs: { username: "guest", password: "123" }, expected: "Authentication failed" }
  ],
  6: [
    { inputs: { s: "babad" }, expected: ["bab", "aba"] },
    { inputs: { s: "cbbd" }, expected: "bb" },
    { inputs: { s: "a" }, expected: "a" }
  ],
  7: [
    { inputs: { input: "A".repeat(100), buffer_size: 16 }, expected: "CompileError/ExecutionBlocked: Safe copy bound exceeded." },
    { inputs: { input: "hello", buffer_size: 16 }, expected: "hello" },
    { inputs: { input: "B".repeat(20), buffer_size: 10 }, expected: "CompileError/ExecutionBlocked: Safe copy bound exceeded." }
  ],
  8: [
    { inputs: { s: "aa", p: "a" }, expected: false },
    { inputs: { s: "aa", p: "a*" }, expected: true },
    { inputs: { s: "ab", p: ".*" }, expected: true },
    { inputs: { s: "aab", p: "c*a*b" }, expected: true }
  ]
};

// --- Main Dashboard Component ---
function Dashboard() {
  const navigate = useNavigate();

  // --- States ---
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentSettingsTab, setCurrentSettingsTab] = useState('profile');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('python');
  
  // Workspace drafts mapping problemId -> language -> draftCode
  const [userWorkspaceCodes, setUserWorkspaceCodes] = useState(() => {
    let savedCodes = localStorage.getItem('vericode_workspace_codes');
    if (savedCodes) {
      try { return JSON.parse(savedCodes); } catch (e) {}
    }
    // Initialize defaults
    let codes = {};
    practiceProblems.forEach(p => {
      codes[p.id] = {
        python: problemTemplates[p.id].python,
        javascript: problemTemplates[p.id].javascript,
        cpp: problemTemplates[p.id].cpp,
        java: problemTemplates[p.id].java
      };
    });
    return codes;
  });

  const [sessionSubmissions, setSessionSubmissions] = useState([
    { problemId: 1, status: "Wrong Answer", runtime: "N/A", memory: "N/A", language: "PYTHON", timestamp: "10 minutes ago" },
    { problemId: 5, status: "Accepted", runtime: "12 ms", memory: "15.4 MB", language: "JAVASCRIPT", timestamp: "5 minutes ago" }
  ]);

  // Sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Console expanded
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);
  const [activeConsoleTab, setActiveConsoleTab] = useState('tc'); // 'tc' or 'res'

  // Settings & Profile
  const [userProfile, setUserProfile] = useState(() => {
    let saved = localStorage.getItem('vericode_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      displayName: "ganeshabbu",
      avatarId: 1,
      nameFirst: "Ganesh",
      nameLast: "Abbu",
      username: "ganeshabbu",
      publicEmail: "user@vericode.ai",
      contactPhone: "",
      location: "",
      birthday: "",
      education: "",
      skills: "Python, JavaScript, C++, Secure Coding",
      contactEmail: "user@vericode.ai",
      bio: "",
      github: "",
      linkedin: "",
      x: "",
      readme: ""
    };
  });

  const [solvedState, setSolvedState] = useState(() => {
    // Problem solved maps
    return {
      1: true,
      2: false,
      3: false,
      4: false,
      5: true,
      6: false,
      7: false,
      8: false
    };
  });

  // To-Do list
  const [todos, setTodos] = useState(() => {
    let saved = localStorage.getItem('vericode_todos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { text: "Audit Express routes for RCE loopholes", completed: true },
      { text: "Solve 3 LeetCode dynamic programming questions in Python", completed: false },
      { text: "Read GeeksforGeeks article on Red-Black Trees", completed: false },
      { text: "Run automated security scan on landing page", completed: false }
    ];
  });

  // Recent Activity logs
  const [activityLogs, setActivityLogs] = useState([
    "Successfully authenticated session.",
    "Bypassed SQL injection filter on practice panel.",
    "Unlocked security credential Badge: <b>\"SQL Injection Shield\"</b>",
    "Loaded AI XML parser configurations."
  ]);

  // AI Chat Messages
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", text: "Hello! I am your Vericode AI Assistant. Ask me questions about secure code compilation, algorithms, or OWASP Top 10 vulnerabilities!" }
  ]);

  const [activeLectureId, setActiveLectureId] = useState(1);
  const [lectureCompleted, setLectureCompleted] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });

  // Dark/Light Theme Settings (draggable)
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [soundwavesMuted, setSoundwavesMuted] = useState(false);

  // Workspace editor ref
  const codeTextAreaRef = useRef(null);

  // Search parameters for practice problem list
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // --- Effects ---
  useEffect(() => {
    // Apply theme class to document body
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Sync workspace codes to localStorage
  useEffect(() => {
    localStorage.setItem('vericode_workspace_codes', JSON.stringify(userWorkspaceCodes));
  }, [userWorkspaceCodes]);

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('vericode_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Sync todos to localStorage
  useEffect(() => {
    localStorage.setItem('vericode_todos', JSON.stringify(todos));
  }, [todos]);

  // Dynamic profile updates in DOM
  useEffect(() => {
    // Update dashboard visual avatars and usernames
    const displayNames = document.querySelectorAll('.user-display-name');
    displayNames.forEach(el => el.innerText = userProfile.displayName);
    const avatars = document.querySelectorAll('.user-avatar-img');
    avatars.forEach(el => el.src = `/avatar_\${userProfile.avatarId}.png`);
  }, [userProfile]);

  // Dragging functionality for options panel
  useEffect(() => {
    const handleDrag = () => {
      const panel = document.getElementById('options-panel-draggable');
      const header = document.getElementById('options-panel-header');
      if (!panel || !header) return;

      let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

      const dragMouseDown = (e) => {
        e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      };

      const elementDrag = (e) => {
        e.preventDefault();
        offsetX = mouseX - e.clientX;
        offsetY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        panel.style.top = (panel.offsetTop - offsetY) + "px";
        panel.style.left = (panel.offsetLeft - offsetX) + "px";
      };

      const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };

      header.onmousedown = dragMouseDown;
    };
    handleDrag();
  }, []);

  // --- Functions / Handlers ---
  const handleSwitchView = (e, viewName, tabId) => {
    if (e) e.preventDefault();
    setCurrentView(viewName);
    if (viewName === 'settings' && tabId) {
      setCurrentSettingsTab(tabId);
    }
    if (viewName === 'workspace' && tabId) {
      loadProblemWorkspace(tabId);
    }
  };

  const loadProblemWorkspace = (problemId) => {
    const prob = practiceProblems.find(p => p.id === problemId);
    if (!prob) return;
    setCurrentProblem(prob);
    setCurrentView('workspace');

    // Default Testcase value
    setTimeout(() => {
      const tcInput = document.getElementById('console-testcase-input');
      if (tcInput) {
        if (problemId === 1) tcInput.value = "nums = [2,7,11,15], target = 9";
        else if (problemId === 2) tcInput.value = "l1 = [2,4,3], l2 = [5,6,4]";
        else if (problemId === 3) tcInput.value = 's = "abcabcbb"';
        else if (problemId === 4) tcInput.value = 'xml = "<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \\\\"file:///etc/passwd\\\\"> ]><foo>&xxe;</foo>"';
        else if (problemId === 5) tcInput.value = 'username = "admin\' OR \'1\'=\'1\\", password = \\"xyz\\"';
        else if (problemId === 6) tcInput.value = 's = "babad"';
        else if (problemId === 7) tcInput.value = 'input = "A" * 100, buffer_size = 16';
        else if (problemId === 8) tcInput.value = 's = "aa", p = "a*"';
      }
      if (codeTextAreaRef.current) {
        codeTextAreaRef.current.value = userWorkspaceCodes[problemId][currentLanguage];
      }
    }, 50);
  };

  const handleChangeWorkspaceLanguage = (e) => {
    const lang = e.target.value;
    if (!currentProblem) return;

    // Save current draft
    const draftCode = codeTextAreaRef.current ? codeTextAreaRef.current.value : '';
    setUserWorkspaceCodes(prev => {
      const updated = { ...prev };
      updated[currentProblem.id][currentLanguage] = draftCode;
      return updated;
    });

    setCurrentLanguage(lang);
    if (codeTextAreaRef.current) {
      codeTextAreaRef.current.value = userWorkspaceCodes[currentProblem.id][lang];
    }
  };

  const handleToggleWorkspaceConsole = () => {
    setIsConsoleExpanded(!isConsoleExpanded);
  };

  const handleSwitchConsoleTab = (tab) => {
    setActiveConsoleTab(tab);
  };

  const handleSwitchWorkspaceTab = (tab) => {
    // Desc, Hints, Solutions, Submissions tabs
    const buttons = ['desc', 'hints', 'solutions', 'submissions'];
    buttons.forEach(b => {
      const el = document.getElementById('tab-btn-' + b);
      const tabPane = document.getElementById('workspace-tab-' + b);
      if (el) el.classList.remove('active');
      if (tabPane) tabPane.style.display = 'none';
    });
    
    const activeEl = document.getElementById('tab-btn-' + tab);
    const activePane = document.getElementById('workspace-tab-' + tab);
    if (activeEl) activeEl.classList.add('active');
    if (activePane) activePane.style.display = 'block';
  };

  const logRecentActivity = (activity) => {
    setActivityLogs(prev => [activity, ...prev].slice(0, 10));
  };

  const updateStreakOnSolve = () => {
    setStreak(prev => prev + 1);
  };

  const handleRunWorkspaceCode = () => {
    setIsConsoleExpanded(true);
    setActiveConsoleTab('res');

    const loader = document.getElementById('console-run-loader');
    const outPanel = document.getElementById('console-run-output');
    if (loader) loader.style.display = 'flex';
    if (outPanel) outPanel.style.display = 'none';

    setTimeout(() => {
      if (loader) loader.style.display = 'none';
      if (outPanel) outPanel.style.display = 'block';

      const tcVal = document.getElementById('console-testcase-input') ? document.getElementById('console-testcase-input').value : '';
      const codeText = codeTextAreaRef.current ? codeTextAreaRef.current.value : '';
      
      let outputText = "";
      let expectedText = "";
      let isCorrect = false;
      let compilationLog = "[Success] Compilation took 14ms.";
      let hasError = false;
      
      try {
        const inputs = parseConsoleTestCase(tcVal);
        let expectedValue = getReferenceOutput(currentProblem.id, inputs);
        expectedText = JSON.stringify(expectedValue);

        let result = executeUserCode(codeText, currentLanguage, currentProblem.id, inputs);
        outputText = JSON.stringify(result);
        
        isCorrect = isMatchExpected(result, expectedValue);
      } catch (err) {
        hasError = true;
        outputText = "RuntimeError: " + err.message;
        compilationLog = "[Error] " + err.message;
        isCorrect = false;
      }

      const color = isCorrect ? "#10b981" : "#ef4444";

      if (outPanel) {
        outPanel.innerHTML = `
          <div style="font-weight: 700; color: \${color}; font-size: 13px; margin-bottom: 8px;">
            \${isCorrect ? "Accepted" : (hasError ? "Runtime Error" : "Wrong Answer / Security Check Failed")}
          </div>
          <div class="console-terminal" style="border-color: rgba(255,255,255,0.06);">
            <span style="color: #8c8c8c;">Input case:</span> \${escapeHtml(tcVal)}
            <span style="color: #8c8c8c;">Your Output:</span> <span style="color: \${color}; font-weight: 600;">\${escapeHtml(outputText)}</span>
            <span style="color: #8c8c8c;">Expected:</span> \${escapeHtml(expectedText)}
            <span style="color: #8c8c8c;">Compilation Log:</span> <span style="color: \${hasError ? '#ef4444' : '#10b981'};">\${escapeHtml(compilationLog)}</span>
          </div>
        `;
      }
    }, 1000);
  };

  const handleSubmitWorkspaceCode = () => {
    setIsConsoleExpanded(true);
    setActiveConsoleTab('res');

    const loader = document.getElementById('console-run-loader');
    const outPanel = document.getElementById('console-run-output');
    if (loader) loader.style.display = 'flex';
    if (outPanel) outPanel.style.display = 'none';

    setTimeout(() => {
      if (loader) loader.style.display = 'none';
      if (outPanel) outPanel.style.display = 'block';

      const codeText = codeTextAreaRef.current ? codeTextAreaRef.current.value : '';
      const testSuite = problemTestSuites[currentProblem.id];
      
      let allPassed = true;
      let failedIndex = -1;
      let failedActual = "";
      let failedExpected = "";
      let failedInputs = "";
      let errorOccurred = false;
      let errorMessage = "";
      
      for (let idx = 0; idx < testSuite.length; idx++) {
        let testCase = testSuite[idx];
        try {
          let result = executeUserCode(codeText, currentLanguage, currentProblem.id, testCase.inputs);
          if (!isMatchExpected(result, testCase.expected)) {
            allPassed = false;
            failedIndex = idx;
            failedActual = JSON.stringify(result);
            failedExpected = JSON.stringify(testCase.expected);
            failedInputs = JSON.stringify(testCase.inputs);
            break;
          }
        } catch (err) {
          allPassed = false;
          failedIndex = idx;
          errorOccurred = true;
          errorMessage = err.message;
          failedInputs = JSON.stringify(testCase.inputs);
          break;
        }
      }

      let status = allPassed ? "Accepted" : (errorOccurred ? "Runtime Error" : "Wrong Answer");
      let runtime = allPassed ? "15 ms" : "N/A";
      let memory = allPassed ? "14.8 MB" : "N/A";
      
      // Update submissions
      setSessionSubmissions(prev => [
        {
          problemId: currentProblem.id,
          status: status,
          runtime: runtime,
          memory: memory,
          language: currentLanguage.toUpperCase(),
          timestamp: "Just now"
        },
        ...prev
      ]);

      if (allPassed) {
        // Toggle solved in list
        setSolvedState(prev => {
          const updated = { ...prev };
          updated[currentProblem.id] = true;
          return updated;
        });

        updateStreakOnSolve();
        logRecentActivity(`Completed Practice problem: <b>"\${currentProblem.title}"</b> (\${currentProblem.difficulty})`);

        if (outPanel) {
          outPanel.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 14px; border-radius: 8px;">
              <h4 style="margin: 0; color: #10b981; font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 6px; font-family: var(--font-display);">
                <svg style="width: 18px; height: 18px;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Success: Accepted!
              </h4>
              <p style="margin: 8px 0 0 0; font-size: 12.5px; color: var(--color-gray-300); line-height: 1.5;">
                All \${testSuite.length} test cases passed successfully. <br>
                Runtime: <strong>\${runtime}</strong> (Beats 96.8% of \${currentLanguage} users) <br>
                Memory: <strong>\${memory}</strong> (Beats 84.1% of \${currentLanguage} users)
              </p>
            </div>
          `;
        }
      } else {
        let errMsg = "";
        if (errorOccurred) {
          errMsg = `Failed test case \${failedIndex + 1}/\${testSuite.length}: Runtime Error: \${errorMessage}`;
        } else {
          const isSecurity = [4, 5, 7].includes(currentProblem.id);
          if (isSecurity) {
            errMsg = `Failed test case \${failedIndex + 1}/\${testSuite.length}: Security Audit check failed. Remediation code must be implemented.`;
          } else {
            errMsg = `Failed test case \${failedIndex + 1}/\${testSuite.length}: Wrong Answer.\\nInput: \${failedInputs}\\nOutput: \${failedActual}\\nExpected: \${failedExpected}`;
          }
        }

        if (outPanel) {
          outPanel.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); padding: 14px; border-radius: 8px;">
              <h4 style="margin: 0; color: #ef4444; font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 6px; font-family: var(--font-display);">
                <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                \${status === "Runtime Error" ? "Runtime Error" : "Validation Failed"}
              </h4>
              <p style="margin: 8px 0 0 0; font-size: 12.5px; color: var(--color-gray-300); line-height: 1.5; white-space: pre-wrap;">
                \${errMsg}
              </p>
            </div>
          `;
        }
      }
    }, 1500);
  };

  const handleSendWorkspaceCodeToAI = (type) => {
    if (!currentProblem) return;
    const codeText = codeTextAreaRef.current ? codeTextAreaRef.current.value : '';
    let promptText = "";

    if (type === 'explain') {
      promptText = `Can you explain the logic of this code for the practice problem "\${currentProblem.title}"?\\n\\nCode snippet (\${currentLanguage.toUpperCase()}):\\n\`\`\`\${currentLanguage}\\n\${codeText}\\n\`\`\``;
    } else if (type === 'audit') {
      promptText = `Please run a static security audit on my code for the practice problem "\${currentProblem.title}". Check for vulnerabilities like SQL injection, XXE, buffer overflows, or logical bypasses, and explain how to patch it.\\n\\nCode snippet:\\n\`\`\`\${currentLanguage}\\n\${codeText}\\n\`\`\``;
    } else if (type === 'optimize') {
      promptText = `Can you optimize the runtime and space complexity of my code for "\${currentProblem.title}"? Provide an explanation of performance issues and the corrected code.\\n\\nCode snippet:\\n\`\`\`\${currentLanguage}\\n\${codeText}\\n\`\`\``;
    }

    setCurrentView('ai-assistant');
    setTimeout(() => {
      const chatInput = document.getElementById('ai-chat-input');
      if (chatInput) {
        chatInput.value = promptText;
        chatInput.dispatchEvent(new Event('input'));
        const sendBtn = document.getElementById('ai-chat-send-btn');
        if (sendBtn) sendBtn.click();
      }
    }, 100);
  };

  // --- To-Do list Handlers ---
  const handleAddTodo = () => {
    const todoInput = document.getElementById('todo-new-task');
    if (!todoInput || !todoInput.value.trim()) return;
    setTodos(prev => [...prev, { text: todoInput.value.trim(), completed: false }]);
    todoInput.value = '';
  };

  const handleToggleTodo = (index) => {
    setTodos(prev => {
      const updated = [...prev];
      updated[index].completed = !updated[index].completed;
      return updated;
    });
  };

  const handleDeleteTodo = (index) => {
    setTodos(prev => prev.filter((_, idx) => idx !== index));
  };

  // --- Profile Settings Handlers ---
  const handleSelectAvatar = (id) => {
    setUserProfile(prev => ({ ...prev, avatarId: id }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const fName = document.getElementById('profile-first-name').value;
    const lName = document.getElementById('profile-last-name').value;
    const username = document.getElementById('profile-username').value;
    const email = document.getElementById('profile-email').value;
    const phone = document.getElementById('profile-phone').value;
    const bio = document.getElementById('profile-bio').value;
    const location = document.getElementById('profile-location').value;
    const birthday = document.getElementById('profile-birthday').value;
    const education = document.getElementById('profile-education').value;
    const skills = document.getElementById('profile-skills').value;
    const github = document.getElementById('profile-github').value;
    const linkedin = document.getElementById('profile-linkedin').value;
    const x = document.getElementById('profile-x').value;
    const readme = document.getElementById('profile-readme').value;

    setUserProfile(prev => ({
      ...prev,
      displayName: username,
      nameFirst: fName,
      nameLast: lName,
      username: username,
      publicEmail: email,
      contactPhone: phone,
      bio: bio,
      location: location,
      birthday: birthday,
      education: education,
      skills: skills,
      github: github,
      linkedin: linkedin,
      x: x,
      readme: readme
    }));

    logRecentActivity("Updated public profile settings.");
    alert("Profile updated successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const curP = document.getElementById('cur-password').value;
    const newP = document.getElementById('new-password').value;
    const conP = document.getElementById('con-password').value;

    if (newP !== conP) {
      alert("New password and confirmation do not match!");
      return;
    }
    logRecentActivity("User security password updated.");
    alert("Password updated successfully!");
    e.target.reset();
  };

  const handleToggleSoundwaves = () => {
    setSoundwavesMuted(!soundwavesMuted);
  };

  const handleMarkAllLecturesRead = () => {
    setLectureCompleted({
      1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true
    });
    logRecentActivity("Marked all learning hub lectures as completed.");
  };

  const handleCloseDrawer = () => {
    const dr = document.getElementById('problem-drawer');
    if (dr) dr.style.display = 'none';
  };

  // --- AI Assistant Chat send ---
  const handleSendChatMessage = () => {
    const input = document.getElementById('ai-chat-input');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    input.value = '';

    // Simulate typing
    setTimeout(() => {
      let aiResponseText = "Thanks for asking! Based on secure coding rules: always use prepared statements to avoid SQL injection, configure DocumentBuilderFactory features to disable XXE general/parameter entity loaders, and run strncpy instead of strcpy to avoid memory overflows. Let me know if you would like me to rewrite or review any section of your workspace code.";
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
    }, 1200);
  };

  // --- Filters ---
  const filteredProblems = practiceProblems.filter(prob => {
    const matchesSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prob.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const isSolved = solvedState[prob.id];
    const matchesStatus = statusFilter === 'all' ? true : (statusFilter === 'solved' ? isSolved : !isSolved);
    const matchesDiff = difficultyFilter === 'all' ? true : prob.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesDiff;
  });

  return (
    <div className="dashboard-body-wrapper" style={{ width: '100%', minHeight: '100vh', background: 'var(--color-gray-950)' }}>
      {/* Extracted JSX Part 1 */}
      ${part1JSX}

      {/* Extracted JSX Part 2 */}
      ${part2JSX}
    </div>
  );
}

export default Dashboard;
`;

fs.writeFileSync(targetFile, componentContent);
console.log('Successfully assembled Dashboard.jsx React Component!');
