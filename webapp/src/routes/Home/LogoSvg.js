import React from 'react'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

const LogoSvg = ({ classes }) => (
  <Box className={classes}>
    <svg width={194} height={186} viewBox='0 0 194 186' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M187.186 111.6C179.539 114.297 171.891 117.022 164.244 119.747C163.938 119.857 163.715 119.802 163.437 119.635C152.258 111.767 141.05 103.898 129.871 96.0304C128.425 95.0301 126.951 94.0013 125.506 92.9724C125.506 92.9439 125.532 92.9439 125.532 92.9173C125.671 92.8887 125.81 92.8887 125.949 92.8887C141.273 92.3886 156.624 91.915 171.974 91.4435C172.225 91.4149 172.391 91.4986 172.558 91.7211C177.453 98.1984 182.376 104.649 187.297 111.126C187.354 111.239 187.437 111.349 187.519 111.461C187.38 111.516 187.297 111.571 187.186 111.6ZM156.762 119.912H156.511C151.813 119.496 147.084 119.08 142.386 118.69C137.295 118.245 132.207 117.8 127.119 117.383C126.784 117.355 126.645 117.244 126.561 116.91C124.699 109.597 122.806 102.285 120.944 95.0016C120.915 94.8628 120.889 94.7505 120.86 94.53C132.875 103.01 144.832 111.433 156.791 119.857C156.791 119.857 156.791 119.886 156.762 119.912ZM124.031 121.025C124.115 121.025 124.197 121.041 124.28 121.05C124.197 121.041 124.115 121.025 124.031 121.025ZM110.459 112.545C106.122 109.959 101.812 107.346 97.5013 104.733C97.2501 104.594 97.0561 104.565 96.805 104.733C88.0454 110.042 79.2286 115.326 70.469 120.609C73.056 110.516 75.641 100.45 78.2567 90.386C78.3404 90.0798 78.2567 89.9145 78.0341 89.7185C74.3077 86.3278 70.5527 82.9064 66.7977 79.5157C62.8487 75.9004 58.8732 72.2872 54.9242 68.7005C54.8956 68.6719 54.8691 68.6454 54.8405 68.6168H54.8691C60.18 68.0881 65.5195 67.5593 70.859 67.0592C75.8922 66.5591 80.9254 66.0589 85.9586 65.5588C86.2649 65.5302 86.4037 65.4465 86.5426 65.1424C90.0199 56.6339 93.4951 48.0989 96.999 39.5619C100.476 48.0989 103.952 56.6339 107.429 65.1424C107.539 65.4465 107.707 65.5302 108.013 65.5588C113.046 66.0589 118.079 66.5591 123.112 67.0592C128.452 67.5593 133.765 68.0881 139.104 68.6168C139.131 68.6168 139.204 68.6249 139.204 68.6249L139.104 68.7005C135.127 72.2872 131.149 75.9004 127.2 79.5157C123.447 82.9064 119.721 86.3278 115.966 89.7185C115.743 89.9145 115.688 90.0798 115.743 90.386C118.33 100.395 120.915 110.377 123.474 120.413C119.137 117.8 114.798 115.158 110.459 112.545ZM120.054 123.166C119.441 126.057 118.831 128.95 118.247 131.869C117.301 136.372 116.382 140.875 115.437 145.352C114.965 147.687 114.492 149.996 113.991 152.303C113.963 152.303 113.936 152.332 113.908 152.332C109.291 138.514 104.674 124.695 100.003 110.765C100.225 110.904 100.337 110.961 100.448 111.045C103.145 112.657 105.871 114.268 108.568 115.909C112.295 118.161 116.021 120.413 119.776 122.638C119.97 122.777 120.109 122.86 120.054 123.166ZM111.739 159.338C106.955 165.872 102.173 172.404 97.389 178.939C97.3053 179.049 97.2215 179.133 97.1378 179.272C97.0561 179.133 96.9724 179.049 96.9173 178.965C92.1618 172.46 87.3777 165.927 82.5936 159.393C82.3996 159.144 82.371 158.921 82.4833 158.586C86.7937 145.658 91.1041 132.759 95.4145 119.829C95.9699 118.134 96.5538 116.465 97.1113 114.77C97.1378 114.797 97.1664 114.797 97.195 114.797C97.2215 114.909 97.2787 115.048 97.3052 115.158C102.144 129.672 106.984 144.184 111.849 158.699C111.933 158.948 111.907 159.115 111.739 159.338ZM80.3149 152.303C80.2863 152.219 80.2577 152.164 80.2311 152.08C79.2858 147.465 78.3404 142.849 77.3664 138.236C76.3373 133.259 75.3082 128.254 74.2526 123.277C74.1954 122.97 74.2526 122.805 74.5303 122.638C80.9805 118.773 87.4328 114.88 93.8851 110.988C93.9954 110.932 94.0791 110.877 94.2751 110.794C89.6299 124.695 85.0132 138.514 80.37 152.332C80.3414 152.332 80.3149 152.332 80.3149 152.303ZM67.4388 116.91C67.3551 117.244 67.2163 117.355 66.91 117.383C61.7931 117.8 56.7047 118.245 51.6144 118.69C46.914 119.08 42.2156 119.496 37.4867 119.912H37.2376C37.2376 119.886 37.209 119.857 37.209 119.857C49.1682 111.433 61.1254 103.01 73.1663 94.53C73.1111 94.7505 73.1112 94.8628 73.056 95.0016C71.1918 102.285 69.301 109.597 67.4388 116.91ZM30.5627 119.635C30.285 119.802 30.089 119.857 29.7562 119.747C22.1094 117.022 14.4605 114.297 6.81372 111.6C6.73 111.571 6.64628 111.516 6.47885 111.461C6.59115 111.349 6.64628 111.239 6.73 111.126C11.6244 104.649 16.5473 98.1984 21.4682 91.7211C21.6071 91.4986 21.7745 91.4149 22.0522 91.4435C37.3764 91.915 52.7272 92.3886 68.0779 92.8887C68.2168 92.8887 68.3291 92.8887 68.4679 92.9173C68.4945 92.9439 68.4945 92.9439 68.4945 92.9724C67.0488 94.0013 65.6032 95.0301 64.1576 96.0304C52.9497 103.898 41.7705 111.767 30.5627 119.635ZM33.8174 84.1312C37.8767 81.9613 41.9359 79.7647 46.0258 77.5703C48.6394 76.1515 51.2529 74.7613 53.8665 73.3426C54.1177 73.1772 54.2565 73.2874 54.424 73.4548C57.6767 76.4005 60.9028 79.3483 64.129 82.296C66.4649 84.4089 68.8008 86.5503 71.1367 88.6896C71.249 88.7733 71.3592 88.857 71.5267 89.0244C56.815 88.5508 42.187 88.0793 27.5877 87.6057C27.5591 87.5791 27.5591 87.5505 27.5591 87.522C29.6459 86.3829 31.7306 85.2703 33.8174 84.1312ZM53.0049 56.1889C51.059 51.9898 49.111 47.8192 47.1651 43.6507C46.1646 41.4808 45.1621 39.3394 44.1329 37.2C44.1615 37.1714 44.1901 37.1428 44.2167 37.1428C56.231 45.4839 68.2454 53.825 80.3414 62.2211C80.0923 62.2497 79.9535 62.2783 79.8126 62.2783C76.6701 62.5825 73.5277 62.9173 70.3587 63.2235C66.0197 63.6399 61.6542 64.0849 57.3153 64.5014C57.0661 64.5299 56.8987 64.5299 56.7599 64.2789C55.5347 61.5822 54.2565 58.8855 53.0049 56.1889ZM41.7705 30.194C41.6868 22.0754 41.6031 13.9283 41.5479 5.80976V5.39332C41.6868 5.44843 41.7971 5.47701 41.8808 5.50355C49.6399 7.89604 57.399 10.2865 65.1581 12.6504C65.4909 12.7606 65.6297 12.928 65.742 13.2342C70.0238 26.2174 74.3077 39.2005 78.5895 52.1857C79.1469 53.8821 79.7023 55.5765 80.2577 57.2463C80.2311 57.2729 80.2026 57.2729 80.2026 57.3014C80.0923 57.2177 79.9534 57.134 79.8697 57.0789C67.2714 48.2928 54.6731 39.5353 42.0482 30.7492C41.8542 30.6104 41.7705 30.443 41.7705 30.194ZM71.249 16.9863C71.3306 17.0434 71.4144 17.07 71.4715 17.1251C75.0019 20.2668 78.5344 23.4085 82.0668 26.5501C85.8769 29.9429 89.7136 33.3357 93.5237 36.7264C93.7749 36.9224 93.83 37.0877 93.6911 37.4225C90.8264 44.3999 87.9902 51.3794 85.1255 58.3568C85.0704 58.4691 85.0132 58.5793 84.9295 58.7753C80.3414 44.7898 75.7533 30.9166 71.1918 17.0149C71.2204 17.0149 71.249 16.9863 71.249 16.9863ZM100.421 36.7264C104.258 33.3357 108.068 29.9429 111.907 26.5501C115.437 23.4085 118.969 20.2668 122.502 17.1251C122.557 17.07 122.641 17.0434 122.696 16.9863C122.724 16.9863 122.751 17.0149 122.78 17.0149C118.192 30.9166 113.63 44.7898 109.042 58.7753C108.958 58.5793 108.903 58.4691 108.846 58.3568C105.983 51.3794 103.118 44.3999 100.254 37.4225C100.141 37.0877 100.199 36.9224 100.421 36.7264ZM128.229 13.2342C128.342 12.928 128.48 12.7606 128.813 12.6504C136.572 10.2865 144.332 7.89604 152.062 5.50355C152.174 5.47701 152.258 5.44843 152.423 5.39332V5.80976C152.342 13.9283 152.285 22.0754 152.201 30.194C152.201 30.443 152.119 30.6104 151.897 30.7492C139.298 39.5353 126.7 48.2928 114.104 57.0789C113.991 57.134 113.881 57.2177 113.769 57.3014C113.74 57.2729 113.74 57.2729 113.714 57.2463C114.269 55.5765 114.827 53.8821 115.382 52.1857C119.664 39.2005 123.948 26.2174 128.229 13.2342ZM146.806 43.6507C144.86 47.8192 142.912 51.9898 140.938 56.1889C139.688 58.8855 138.437 61.5822 137.185 64.2789C137.073 64.5299 136.879 64.5299 136.656 64.5014C132.291 64.0849 127.952 63.6399 123.586 63.2235C120.444 62.9173 117.301 62.5825 114.159 62.2783C114.02 62.2783 113.881 62.2497 113.63 62.2211C125.728 53.825 137.74 45.4839 149.755 37.1428C149.783 37.1428 149.783 37.1714 149.81 37.2C148.809 39.3394 147.809 41.4808 146.806 43.6507ZM139.576 73.4548C139.743 73.2874 139.882 73.1772 140.16 73.3426C142.774 74.7613 145.389 76.1515 148.003 77.5703C152.062 79.7647 156.123 81.9613 160.183 84.1312C162.269 85.2703 164.354 86.3829 166.467 87.522C166.441 87.5505 166.441 87.5791 166.441 87.6057C151.813 88.0793 137.212 88.5508 122.473 89.0244C122.667 88.857 122.751 88.7733 122.863 88.6896C125.199 86.5503 127.535 84.4089 129.871 82.296C133.124 79.3483 136.35 76.4005 139.576 73.4548ZM191.58 110.21C185.963 102.73 180.317 95.2792 174.672 87.8282C174.282 87.2995 173.698 87.1055 173.171 86.7993C167.219 83.5474 161.24 80.322 155.288 77.0967C150.061 74.2612 144.832 71.4257 139.605 68.5882C139.572 68.5719 139.517 68.5453 139.517 68.5453L139.576 68.4229C142.079 63.001 144.583 57.6342 147.084 52.2409C149.949 46.0677 152.785 39.8967 155.65 33.7521C155.901 33.1969 156.234 32.6947 156.234 32.0272C156.291 22.6858 156.372 13.3445 156.43 4.00314C156.456 2.66808 156.456 1.3616 156.456 0C156.317 0.0265379 156.207 0.0551172 156.123 0.081655C146.222 3.14168 136.35 6.19966 126.451 9.25764C125.671 9.48015 124.948 9.75778 124.419 10.3702C124.338 10.4539 124.254 10.5355 124.17 10.6192C119.221 14.9572 114.269 19.3216 109.32 23.6881C105.232 27.3014 101.087 30.9166 96.999 34.5585C92.856 30.9432 88.7682 27.3014 84.6518 23.6881C79.7023 19.3216 74.7528 14.9572 69.8013 10.6192C69.7196 10.5355 69.6359 10.4539 69.5522 10.3702C68.9947 9.75778 68.2719 9.48015 67.494 9.25764C57.6215 6.19966 47.7205 3.14168 37.8481 0.081655C37.7378 0.0551172 37.6541 0.0265379 37.5153 0V4.00314C37.599 13.3445 37.6827 22.6858 37.7378 32.0272C37.7378 32.6947 38.0706 33.1969 38.3218 33.7521C41.1579 39.8967 44.0227 46.0677 46.8874 52.2409C49.3908 57.6342 51.8921 63.001 54.3668 68.4229L54.4403 68.58C49.2111 71.4155 43.9676 74.2612 38.7383 77.0967C32.7597 80.322 26.7811 83.5474 20.8291 86.7993C20.3003 87.1055 19.7163 87.2995 19.3283 87.8282C13.7091 95.2792 8.06538 102.73 2.41961 110.21C1.64166 111.239 0.835124 112.294 0 113.407C0.167433 113.462 0.25115 113.49 0.332825 113.519C10.095 116.967 19.8551 120.413 29.6173 123.889C30.3687 124.138 31.1181 124.361 31.9246 124.195C32.0369 124.167 32.1472 124.167 32.2595 124.167C38.8506 123.611 45.4132 123.083 51.9758 122.525C57.9544 122.025 63.8554 121.548 69.8074 121.047L69.885 121.386C71.1367 127.253 72.3597 133.12 73.5849 138.985C74.9468 145.407 76.3087 151.858 77.6727 158.28C77.6992 158.392 77.7278 158.503 77.7278 158.615C77.8115 159.421 78.2015 160.089 78.7018 160.728C84.7906 169.04 90.8529 177.381 96.9438 185.722C96.999 185.777 97.0561 185.861 97.1378 186C97.9444 184.887 98.7243 183.832 99.5023 182.775C105.036 175.268 110.543 167.762 116.076 160.254C116.466 159.727 116.466 159.115 116.605 158.531C117.996 151.913 119.386 145.297 120.777 138.681C122 132.869 123.196 127.059 124.419 121.276C124.419 121.276 124.458 121.062 124.458 121.064L124.48 121.066C130.375 121.566 136.156 122.025 142.024 122.525C148.615 123.083 155.178 123.611 161.74 124.167C161.851 124.167 161.963 124.167 162.073 124.195C162.88 124.361 163.631 124.138 164.409 123.889C174.143 120.413 183.905 116.967 193.665 113.519C193.749 113.49 193.861 113.462 194 113.407C193.165 112.294 192.387 111.239 191.58 110.21Z'
        fill='#443F56'
      />
    </svg>
  </Box>
)

LogoSvg.propTypes = {
  classes: PropTypes.any
}

export default LogoSvg