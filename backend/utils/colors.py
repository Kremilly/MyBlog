class Colors:
    
    @classmethod
    def default_cover_colors(cls):
        return (124, 89, 81), (253, 209, 130)
    
    @classmethod
    def rgb_to_tuple(cls, rgb_color):
        if rgb_color is not None:
            rgb_values = rgb_color[4:-1]

            return tuple(
                map(
                    int, rgb_values.split(', ')
                )
            )
