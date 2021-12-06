.DEFAULT_GOAL := build
.PHONY: build

BIN = $(shell yarn bin)

build: build-clean build-react build-preact

build-clean:
	@rm -rf lib

build-react:
	@${BIN}/tsc --outDir lib/react
	@${BIN}/tsc --outDir lib/react/esm --module es2020 --target es2019
	@cp package.json lib/react
	@cp *.md lib/react
	@rsync --archive --prune-empty-dirs --exclude '*.ts' --relative src/./ lib/react
	@${BIN}/ts-node --project tsconfig.node.json scripts/patchReact.ts

build-preact:
	@${BIN}/ts-node --project tsconfig.node.json scripts/switchAdaptor.ts preact
	@${BIN}/tsc --outDir lib/preact
	@${BIN}/tsc --outDir lib/preact/esm --module es2020 --target es2019
	@cp package.json lib/preact
	@cp *.md lib/preact
	@rsync --archive --prune-empty-dirs --exclude '*.ts' --relative src/./ lib/preact
	@${BIN}/ts-node --project tsconfig.node.json scripts/patchPreact.ts
	@${BIN}/ts-node --project tsconfig.node.json scripts/switchAdaptor.ts react

publish: build
	cd lib/react && npm publish --access public
	cd lib/preact && npm publish --access public

publish-next: build
	cd lib/react && npm publish --access public --tag next
	cd lib/preact && npm publish --access public --tag next

docs:
	@${BIN}/typedoc --theme minimal --name "Firebase React Hooks"
.PHONY: docs