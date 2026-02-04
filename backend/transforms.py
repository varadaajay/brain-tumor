from monai.transforms import (
    Compose, LoadImaged, EnsureChannelFirstd, 
    NormalizeIntensityd, Resized, Orientationd, ToTensord
)

def get_inference_transforms():
    return Compose([
        LoadImaged(keys=["image"]),
        EnsureChannelFirstd(keys=["image"]),
        Orientationd(keys=["image"], axcodes="RAS"),
        # Resize to standard size for the model (e.g., 128x128x128)
        Resized(keys=["image"], spatial_size=(128, 128, 128)),
        NormalizeIntensityd(keys=["image"]),
        ToTensord(keys=["image"]),
    ])