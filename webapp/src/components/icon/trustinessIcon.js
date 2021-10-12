import React, { memo } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import { makeStyles } from '@mui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const TrustinessIcon = props => {
  const classes = useStyles()

  return (
    <SvgIcon viewBox='0 0 53 37' classes={{ root: classes.root }} {...props}>
      <path
        fill='#433F5B'
        fillRule='nonzero'
        d='M43.687 0L31.773 12.424l-.548-.546h-.137c-.685-.41-1.37-.546-2.054-.546-.548 0-.96.137-1.507.273-.137.137-.41.137-.548.273h-.274c-1.506-1.092-3.56-.819-4.93.41L9.313 0 0 9.284l12.463 12.424 1.095 1.093c.274.273.822.273 1.096 0 .274-.273.274-.82 0-1.093l3.56-3.55 1.37-1.365 2.739-2.73.548-.546c.685-.683 1.78-.82 2.602-.41l-3.698 3.686c-.958.956-.958 2.321 0 3.277l.548.546c.959.956 2.465.956 3.287 0l3.834-3.823 8.08 8.056c.822.819.96 1.638.685 1.775l-.41.682a.418.418 0 0 1-.548 0c-.411-.136-.959-.41-1.233-.819l-2.739-2.594c-.274-.273-.822-.273-1.096 0-.273.273-.273.82 0 1.092l2.74 2.73c.821.82.958 1.64.684 1.776l-.548.546a.418.418 0 0 1-.547 0c-.411-.137-.959-.41-1.233-.82l-2.739-2.73c-.274-.273-.822-.273-1.096 0-.273.273-.273.82 0 1.092l2.74 2.731c.821.82.958 1.638.684 1.775l-.548.683c-.137.136-1.095.136-1.78-.683l-2.739-2.73c-.274-.274-.822-.274-1.096 0l-.137.136h-.136c.136-.82 0-1.639-.548-2.185l-.548-.546c-.274-.273-.548-.41-.959-.546.274-.82 0-1.775-.548-2.321l-.547-.546c-.822-.82-2.055-.956-3.013-.273-.137-.273-.274-.546-.411-.683l-.822-.683c-.958-.955-2.465-.955-3.287 0l-1.095 1.093c-.959.955-.959 2.457 0 3.276l.548.547c.41.41.958.682 1.506.682 0 .546.274 1.093.685 1.502l.548.546c.41.41.958.683 1.506.683 0 .546.274 1.092.685 1.502l.548.546c.41.41.958.683 1.506.683 0 .546.274 1.092.685 1.501l.548.546c.41.41 1.095.683 1.643.683.41 0 .685-.136.959-.273l.547.546c.685.683 1.644 1.229 2.603 1.229.547 0 .958-.273 1.37-.546l.547-.546c.41-.41.548-1.093.548-1.775h.274c.547 0 .958-.137 1.37-.546l.547-.546c.41-.41.685-1.093.548-1.775h.274c.547 0 .958-.137 1.37-.546l.547-.547c.41-.41.548-1.092.548-1.774h.274c.547 0 .958-.137 1.37-.547l.547-.546c.959-.955.685-2.73-.685-3.96l-.41-.409-7.67-7.782c.274-.273.274-.82 0-1.092-.274-.273-.822-.273-1.096 0l-4.93 4.915c-.274.273-.821.273-1.095 0h-.411c-.274-.273-.274-.82 0-1.092l4.382-4.37c.959-.955 2.328-.955 3.287 0l.548.547 2.739 2.73 1.37 1.366 3.56 3.55-.548.546c-.274.273-.274.819 0 1.092.274.273.822.273 1.096 0l.548-.546 1.095-1.093L53 9.284 43.687 0zM12 18.015L18.913 11 21 13.118l-3.391 3.44-1.305 1.324L14.217 20 12 18.015zm4.196 7.268c-.261-.261-.261-.783 0-1.044l1.043-1.043c.261-.261.783-.261 1.044 0l.521.521c.261.261.261.783 0 1.044l-1.043 1.043c-.261.261-.783.261-1.044 0l-.521-.521zm2.031 2.884c-.303-.303-.303-.91 0-1.212l1.212-1.213 1.516-1.515c.303-.303.909-.303 1.212 0l.606.606c.303.303.303.91 0 1.212l-.758.758-1.97 1.97c-.303.303-.909.303-1.212 0l-.606-.606zm2.987 2.061c-.285-.28-.285-.842 0-1.123l1.857-1.824c.143-.14.429-.281.572-.281.286 0 .428.14.571.28l.572.562c.285.28.285.842 0 1.123l-.572.702-1.143 1.122c-.285.281-.857.281-1.142 0l-.715-.56zm3.503 3.488l-.521-.505c-.261-.253-.261-.758 0-1.011l1.043-1.01c.261-.253.783-.253 1.044 0l.521.505c.261.252.261.758 0 1.01l-1.043 1.01c-.391.38-.783.38-1.044 0 0 .127 0 .127 0 0zm4.432.132c.86.728 1.003 1.455.717 1.576l-.573.485c-.144.121-.43.121-.573 0-.43-.121-1.004-.364-1.29-.727l-.43-.364.573-.485c.43-.363.717-.848.717-1.333l.86.727v.121zM40.227 21l-2.182-2.133-1.363-1.334L33 14.067 43.773 3 51 10.067 40.227 21z'
      />
    </SvgIcon>
  )
}

export default memo(TrustinessIcon)
