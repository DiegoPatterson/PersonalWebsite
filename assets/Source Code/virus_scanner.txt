#!/bin/bash

# Define output colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RESET='\033[0m'
LOG_FILE="malware_scan.log"

# Instructions before running

echo "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
echo "|| 									   ||"
echo "||  \\\\  // |||| |||| || || ||||   |||| |||| ||||| |\\\\ || |\\\\ || |||| ||||  ||"
echo "||   \\\\//   ||  |__| || ||  \\\\     \\\\  ||   ||_|| ||\\\\|| ||\\\\|| ||__ |__|  ||"
echo "||    \\/   |||| ||\\\\ ||||| ||||   |||| |||| || || || \\\\| || \\\\| ||__ ||\\\\  ||"
echo "||  =====================================================================  ||"
echo "|| 									   ||"
echo "|| 			   INSTRUCTIONS FOR USE 			   ||"
echo "|| 	   Before this runs, know that you need to have curl and jq 	   ||"
echo "|| 	   If you dont, run:						   ||"
echo "|| 			   sudo apt install curl 			   ||"
echo "|| 			   sudo apt install jq 				   ||"
echo "||									   ||"
echo "||	   This script works better if you run it using sudo		   ||"
echo "||									   ||"
echo "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"

# Ensure curl and jq are installed
if ! command -v curl &>/dev/null || ! command -v jq &>/dev/null; then
    echo -e "${YELLOW}ERROR: curl and jq are required. Install them first.${RESET}"
    exit 1
fi

# Fetch known malware hashes from MalwareBazaar
echo "Fetching latest malware hashes..."
API_RESPONSE=$(curl -s -X POST "https://mb-api.abuse.ch/api/v1/" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data "query=get_recent&selector=100")

KNOWN_HASHES=$(echo "$API_RESPONSE" | jq -r 'if .data then .data[].sha256_hash else empty end')

if [ -z "$KNOWN_HASHES" ]; then
    echo -e "${YELLOW}WARNING: No malware hashes retrieved. Exiting.${RESET}"
    echo "API Response: $API_RESPONSE"  # Debugging
    exit 1
fi

# Function to query MalwareBazaar for malware details
query_malware_info() {
    local HASH=$1
    local API_KEY="4ba7086e0cf74901138495925efdae00a2e8ed8457b1f043" # Replace with actual key

    RESPONSE=$(wget --header="Auth-Key: $API_KEY" \
        --post-data="query=get_info&hash=$HASH" \
        -qO- https://mb-api.abuse.ch/api/v1/)

    echo "$RESPONSE"
}

# Scan directories (avoid scanning entire system for efficiency)
echo "Starting full system scan..."
MALWARE_FOUND=0
COUNT=0

find /home /root /tmp /var/tmp /usr/local/bin /bin /usr/bin /sbin /usr/sbin \
    -type f 2>/dev/null | while read -r FILE; do
    
    ((COUNT++))
    if ((COUNT % 1000 == 0)); then
        echo "Scanned $COUNT files so far..."
    fi

    # Generate SHA-256 hash of the file
    FILE_HASH=$(sha256sum "$FILE" | awk '{print $1}')

    # Check if hash is in known malware list
    if grep -q "$FILE_HASH" <<< "$KNOWN_HASHES"; then
        echo -e "${RED}ALERT: Malware detected!${RESET} File: ${YELLOW}$FILE${RESET}"
        echo "$(date) - ALERT: Malware detected in $FILE" >> "$LOG_FILE"
        MALWARE_FOUND=1

        # Query MalwareBazaar for more info
        MALWARE_INFO=$(query_malware_info "$FILE_HASH")
        echo -e "Malware Details:\n$MALWARE_INFO"
    fi
done

# Final results message
if [ "$MALWARE_FOUND" -eq 0 ]; then
    echo -e "${GREEN}RESULTS: No known malware found on the system.${RESET}"
else
    echo -e "${RED}Scan complete. Malware found! Check $LOG_FILE for details.${RESET}"
fi

