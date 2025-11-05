#!/usr/bin/env python3
"""
Sync FAQ from GitHub Issues to faq.json
"""

import json
import re
import sys
from datetime import datetime

def parse_faq_data(issue_title, comment_body, issue_number):
    """从issue标题和评论中解析FAQ数据"""
    # 从issue标题提取问题 (移除 "FAQ: " 前缀)
    question = issue_title.replace("FAQ: ", "").strip()
    
    # 从评论中提取答案 (移除 "/faq " 前缀)
    answer = comment_body.replace("/faq ", "").strip()
    
    return {
        "id": issue_number,
        "question": question,
        "answer": answer,
        "last_updated": datetime.now().isoformat()
    }

def update_faq_json(new_faq):
    """更新faq.json文件"""
    try:
        # 读取现有的FAQ数据
        with open('faq.json', 'r', encoding='utf-8') as f:
            faqs = json.load(f)
    except FileNotFoundError:
        # 如果文件不存在，创建新的结构
        faqs = {"faqs": []}
    
    # 检查是否已存在相同ID的FAQ
    existing_ids = [faq["id"] for faq in faqs.get("faqs", [])]
    if new_faq["id"] in existing_ids:
        print(f"FAQ with ID {new_faq['id']} already exists, skipping...")
        return
    
    # 添加新的FAQ
    faqs.setdefault("faqs", []).append(new_faq)
    
    # 写回文件
    with open('faq.json', 'w', encoding='utf-8') as f:
        json.dump(faqs, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully added FAQ: {new_faq['question']}")

def main():
    if len(sys.argv) != 4:
        print("Usage: python sync_faq.py <issue_title> <comment_body> <issue_number>")
        sys.exit(1)
    
    issue_title = sys.argv[1]
    comment_body = sys.argv[2]
    issue_number = int(sys.argv[3])
    
    print(f"Processing FAQ from issue #{issue_number}")
    print(f"Question: {issue_title}")
    print(f"Answer: {comment_body}")
    
    # 解析数据
    new_faq = parse_faq_data(issue_title, comment_body, issue_number)
    
    # 更新JSON文件
    update_faq_json(new_faq)
    
    print("FAQ sync completed successfully!")

if __name__ == "__main__":
    main()
