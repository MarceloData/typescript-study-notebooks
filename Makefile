TOPICS := $(shell find . -maxdepth 1 -type d ! -path '.' -exec test -f '{}/tsconfig.json' ';' -print | sed 's|./||')
entry ?= hello

build:
	tsc --project $(topic)/tsconfig.json

run: build
	node $(topic)/dist/$(entry).js

clean:
	rm -rf $(topic)/dist

.PHONY: lint
lint:
	@echo "🔍 Running ESLint on all topics: $(TOPICS)"
	@for dir in $(TOPICS); do \
		echo "→ Linting $$dir..."; \
		npx eslint $$dir/src --ext .ts || exit 1; \
	done