from monai.transforms import (
    Compose,
    LoadImaged,
    EnsureChannelFirstd,
    Orientationd,
    Spacingd,
    Resized,
    NormalizeIntensityd,
    ToTensord
)

def get_inference_transforms(img_size=(128, 128, 128)):
    """
    Inference preprocessing for 3D medical segmentation models
    """

    return Compose([
        # Load NIfTI image
        LoadImaged(keys=["image"]),

        # Convert to (C, H, W, D)
        EnsureChannelFirstd(keys=["image"]),

        # Standard orientation
        Orientationd(keys=["image"], axcodes="RAS"),

        # Resample voxel spacing
        Spacingd(
            keys=["image"],
            pixdim=(1.0, 1.0, 1.0),
            mode="bilinear"
        ),

        # Resize to model input size
        Resized(
            keys=["image"],
            spatial_size=img_size
        ),

        # Normalize intensity
        NormalizeIntensityd(
            keys=["image"],
            nonzero=True,
            channel_wise=True
        ),

        # Convert to tensor
        ToTensord(keys=["image"]),
    ])

import torch
from monai.networks.nets import UNet

model = UNet(
    spatial_dims=3,
    in_channels=1,
    out_channels=3,   # tumor classes
    channels=(16, 32, 64, 128, 256),
    strides=(2, 2, 2, 2),
)

model.load_state_dict(torch.load("unet.pth"))
model.eval()

transforms = get_inference_transforms()

data = {"image": "brain.nii.gz"}
img = transforms(data)["image"].unsqueeze(0)

with torch.no_grad():
    output = model(img)
    pred = torch.argmax(output, dim=1)





import torch
from monai.networks.nets import VNet

model = VNet(
    spatial_dims=3,
    in_channels=1,
    out_channels=3
)

model.load_state_dict(torch.load("vnet.pth"))
model.eval()

transforms = get_inference_transforms()

data = {"image": "brain.nii.gz"}
img = transforms(data)["image"].unsqueeze(0)

with torch.no_grad():
    output = model(img)
    pred = torch.argmax(output, dim=1)



import torch

# Load trained Mediseg / Mediseek model
model = torch.load("mediseg_model.pth", map_location="cpu")
model.eval()

transforms = get_inference_transforms(img_size=(128,128,128))

data = {"image": "brain.nii.gz"}
img = transforms(data)["image"].unsqueeze(0)

with torch.no_grad():
    output = model(img)

    # If multi-class segmentation
    pred = torch.argmax(output, dim=1)

    # If sigmoid / binary
    # pred = (torch.sigmoid(output) > 0.5).float()


