#!/bin/bash
cd /home/kavia/workspace/code-generation/honeymoon-memory-journal-ad3a6afd/honeymoon_journal_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

