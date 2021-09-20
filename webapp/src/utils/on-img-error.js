export const onImgError = defaultLogo => ev => {
  if (ev.target.src === defaultLogo) {
    return
  }

  ev.target.src = defaultLogo
}
