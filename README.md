# tiefgang actions

GitHub Actions by [tiefgang GmbH](https://tiefgang.gmbh), consumed as
`tiefgang-gmbh/actions/<name>`.

| action                       | what it does                                         |
| ---------------------------- | ---------------------------------------------------- |
| [example](example/README.md) | The contract template: echoes an input to an output. |

## Usage

```yaml
- uses: tiefgang-gmbh/actions/example@v0
  with:
    name: tiefgang
```

Pin the floating major tag (`@v0` today, `@v1` from the first stable
release). Every action in this repository shares one version line: a
release tags the whole tree, and a major bump moves every action.

## Versioning

Releases are semantic versions computed from the commit history since
the last tag (conventional commits): `feat` bumps minor, `fix` bumps
patch, a breaking change bumps major — before 1.0.0, one step lower.
Each release is an annotated tag `vX.Y.Z`, the moved major tag `vX`,
and a GitHub Release carrying the notes.

## This repository is a mirror

The actions are developed in tiefgang's monorepo and this repository
is written by its CI on every merge: the `actions/` directory there is
this tree, commit for commit. Please file **issues** here. Pull
requests cannot be merged here: the mirror accepts only fast-forward
pushes from the monorepo, so a commit merged here would block every
later mirror push. A change proposal is best made as an issue with
the diff attached.

## License

Apache-2.0 — see [LICENSE](LICENSE).
