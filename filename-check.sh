#!/bin/bash
echo "Checking for non-Windows compatible filenames..."
if git rev-parse --verify HEAD >/dev/null 2>&1
then
	against=HEAD
else
	# Initial commit: diff against an empty tree object
	against=
fi
git diff --cached --name-only --diff-filter=A -z $against | while IFS= read -r -d '' filename; do
  # Non-printable characters from ASCII range 0-31
  nonprintablechars=$(echo -n "$filename" | LC_ALL=C tr -d '[ -~]' | wc -c)
  # Illegal characters: < > : " / \ | ? *
  # We don't test for / (forward slash) here as that is even on *nix not allowed in *filename*
  illegalchars=$(echo -n "$filename" | LC_ALL=C grep -E '(`<|>|:|"|\\|\||\?|\*)' | wc -c)
  # No trailing period or space
  trailingperiodorspace=$(echo -n "$filename" | LC_ALL=C grep -E '(\.| )$' | wc -c)
  # File name is all periods
  filenameallperiods=$(echo -n "$filename" | LC_ALL=C grep -E '^\.+$' | wc -c)
  # debug output
  if test -n "$GIT_TRACE"
  then
    echo "File: ${filename}"
    echo nonprintablechars=$nonprintablechars
    echo illegalchars=$illegalchars
    echo trailingperiodorspace=$trailingperiodorspace
    echo filenameallperiods=$filenameallperiods
  fi
  if test $nonprintablechars -ne 0 \
     || test $illegalchars -ne 0 \
     || test $trailingperiodorspace -ne 0 \
     || test $filenameallperiods -ne 0
  then
    echo "You are trying to commit file(s) which are named incorrectly (${filename}). Please check and try committing again."
    exit 1
  fi
done
