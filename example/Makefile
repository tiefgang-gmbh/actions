ROOT := ../..

.PHONY: deps lint test cover build dist-check test-functional check clean

deps:
	@[ -f $(ROOT)/node_modules/.modules.yaml ] && [ $(ROOT)/node_modules/.modules.yaml -nt $(ROOT)/pnpm-lock.yaml ] || (cd $(ROOT) && pnpm install --frozen-lockfile)

lint: deps
	cd $(ROOT) && pnpm exec eslint actions/example
	cd $(ROOT) && pnpm exec prettier --check actions/example
	pnpm exec tsc --noEmit -p .

test: deps
	pnpm exec vitest run

# cover RUNS the suite (typescript.md): check composes cover, never both.
cover: deps
	pnpm exec vitest run --coverage

# One self-contained ESM bundle: the consumer's runner executes it with
# nothing installed. The banner gives the toolkit's CommonJS internals a
# `require` under ESM (design D-4).
BANNER := import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);

build: deps
	pnpm exec esbuild src/main.ts --bundle --platform=node --target=node24 --format=esm --outfile=dist/index.js --banner:js="$(BANNER)"

# The committed bundle must equal a fresh build (INV-ACTIONS-3). Builds
# into a scratch path so `check` never dirties the tree, then compares
# byte for byte.
dist-check: deps
	mkdir -p .output
	pnpm exec esbuild src/main.ts --bundle --platform=node --target=node24 --format=esm --outfile=.output/dist-check.js --banner:js="$(BANNER)"
	cmp -s .output/dist-check.js dist/index.js || (echo "dist/index.js is stale — run make build" >&2 && exit 1)

# Runs the COMMITTED bundle as a child process under the runner's
# environment contract (INV-ACTIONS-6), never the sources.
test-functional: deps
	pnpm exec vitest run --config vitest.functional.config.ts

check: lint cover build dist-check test-functional

# dist/ is source-controlled output; it is never cleaned.
clean:
	rm -rf coverage .output
