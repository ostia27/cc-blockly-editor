package com.gly091020.NetMusicPeripheral.peripheral;

import com.github.tartaricacid.netmusic.item.ItemMusicCD;
import com.github.tartaricacid.netmusic.tileentity.TileEntityMusicPlayer;
import com.gly091020.NetMusicPeripheral.NetMusicListUtil;
import com.gly091020.NetMusicPeripheral.NetMusicPeripheral;
import dan200.computercraft.api.lua.LuaException;
import dan200.computercraft.api.lua.LuaFunction;
import dan200.computercraft.api.peripheral.IComputerAccess;
import net.minecraft.world.Container;
import net.minecraft.world.item.ItemStack;
import org.jetbrains.annotations.Nullable;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class PlayerMethods {
    private final TileEntityMusicPlayer player;
    @Nullable
    private IComputerAccess computerAccess;

    public PlayerMethods(TileEntityMusicPlayer player) {
        this.player = player;
    }

    public static void requirePlayList() throws LuaException {
        if(!NetMusicPeripheral.hasNetMusicList)throw new LuaException("Net Music: Play List is not installed");
    }

    public void setComputerAccess(@Nullable IComputerAccess computer){
        computerAccess = computer;
    }

    @LuaFunction(mainThread = true)
    public void stop(){
        if(!player.isPlay())return;
        player.setPlay(false);
        player.markDirty();
    }

    @LuaFunction(mainThread = true)
    public void play(){
        if(player.isPlay())return;
        player.setPlay(true);
        var info = ItemMusicCD.getSongInfo(player.getPlayerInv().getStackInSlot(0));
        if(info != null)player.setPlayToClient(info);
        player.markDirty();
    }

    @LuaFunction(mainThread = true)
    public void pushCD(String from, int slot) throws LuaException {
        slot = slot - 1;  // lua索引从1开始
        if(computerAccess == null)throw new LuaException("Computer not connected");
        var chest = computerAccess.getAvailablePeripheral(from);
        if(chest == null){
            throw new LuaException("404 Not Found");
        }
        if (!(chest.getTarget() instanceof Container container)) {
            throw new LuaException("Target is not a container");
        }
        if (slot < 0 || slot >= container.getContainerSize()) {
            throw new LuaException("Slot index out of range. Valid slots: 1 to " + container.getContainerSize());
        }
        var item = container.getItem(slot);
        if (ItemMusicCD.getSongInfo(item) == null) {
            throw new LuaException("Item in slot " + (slot + 1) + " is not a valid music CD");
        }
        if (!player.getPlayerInv().getStackInSlot(0).isEmpty()) {
            throw new LuaException("Music player already contains an item");
        }
        player.getPlayerInv().setStackInSlot(0, item.split(1));
        player.markDirty();
    }

    @LuaFunction(mainThread = true)
    public void pullCD(String to, int slot) throws LuaException {
        slot = slot - 1;  // lua索引从1开始
        if(computerAccess == null)throw new LuaException("Computer not connected");
        var chest = computerAccess.getAvailablePeripheral(to);
        if(chest == null){
            throw new LuaException("404 Not Found");
        }
        if (!(chest.getTarget() instanceof Container container)) {
            throw new LuaException("Target is not a container");
        }
        if (slot < 0 || slot >= container.getContainerSize()) {
            throw new LuaException("Slot index out of range. Valid slots: 1 to " + container.getContainerSize());
        }
        var itemToPut = player.getPlayerInv().getStackInSlot(0);
        if(itemToPut.isEmpty())throw new LuaException("Music player is empty");

        if (!container.canPlaceItem(slot, itemToPut)) {
            throw new LuaException("Cannot place item in slot " + (slot + 1));
        }
        ItemStack currentStack = container.getItem(slot);
        if (currentStack.isEmpty()) {
            player.getPlayerInv().setStackInSlot(0, ItemStack.EMPTY);
            container.setItem(slot, itemToPut);
            container.setChanged();
            player.setPlay(false);
            player.markDirty();
        }
        else if (ItemStack.isSameItemSameTags(currentStack, itemToPut)) {
            int maxStackSize = Math.min(container.getMaxStackSize(), currentStack.getMaxStackSize());
            int spaceAvailable = maxStackSize - currentStack.getCount();
            if (spaceAvailable <= 0) {
                throw new LuaException("Slot " + (slot + 1) + " is full");
            }
            int amountToTransfer = Math.min(spaceAvailable, itemToPut.getCount());
            itemToPut.shrink(amountToTransfer);
            if (itemToPut.isEmpty()) {
                player.getPlayerInv().setStackInSlot(0, ItemStack.EMPTY);
                player.setPlay(false);
            } else {
                player.getPlayerInv().setStackInSlot(0, itemToPut);
            }
            currentStack.grow(amountToTransfer);
            container.setItem(slot, currentStack);
            container.setChanged();
            player.markDirty();
        }
        else {
            throw new LuaException("Slot " + (slot + 1) + " already contains different items");
        }
    }

    @LuaFunction(mainThread = true)
    public String getUrl(){
        var item = player.getPlayerInv().getStackInSlot(0);
        var info = ItemMusicCD.getSongInfo(item);
        if(info == null)return null;
        return info.songUrl;
    }

    @LuaFunction(mainThread = true)
    public boolean getVip(){
        var item = player.getPlayerInv().getStackInSlot(0);
        var info = ItemMusicCD.getSongInfo(item);
        if(info == null)return false;
        return info.vip;
    }

    @LuaFunction(mainThread = true)
    public boolean getReadonly(){
        var item = player.getPlayerInv().getStackInSlot(0);
        var info = ItemMusicCD.getSongInfo(item);
        if(info == null)return false;
        return info.readOnly;
    }

    @LuaFunction(mainThread = true)
    public String getName(){
        var item = player.getPlayerInv().getStackInSlot(0);
        var info = ItemMusicCD.getSongInfo(item);
        if(info == null)return null;
        return info.songName;
    }

    @LuaFunction(mainThread = true)
    public String getTransName(){
        var item = player.getPlayerInv().getStackInSlot(0);
        var info = ItemMusicCD.getSongInfo(item);
        if(info == null)return null;
        return info.transName;
    }

    @LuaFunction(mainThread = true)
    public int getSecond(){
        var item = player.getPlayerInv().getStackInSlot(0);
        var info = ItemMusicCD.getSongInfo(item);
        if(info == null)return 0;
        return info.songTime;
    }

    @LuaFunction(mainThread = true)
    public List<String> getArtists(){
        var item = player.getPlayerInv().getStackInSlot(0);
        var info = ItemMusicCD.getSongInfo(item);
        if(info == null)return Collections.emptyList();
        return info.artists;
    }

    @LuaFunction(mainThread = true)
    public float getCurrentTime(){
        return (float) player.getCurrentTime() / 20;
    }

    @LuaFunction(mainThread = true)
    public void setCDUrl(String url, int second, Optional<String> songName) throws LuaException {
        var item = player.getPlayerInv().getStackInSlot(0);
        if(item.isEmpty())throw new LuaException("Music player is empty");
        var oldInfo = ItemMusicCD.getSongInfo(item);
        if(oldInfo != null && oldInfo.readOnly)throw new LuaException("CD is read only");
        var info = new ItemMusicCD.SongInfo();
        info.songTime = second;
        info.songUrl = url;
        info.songName = songName.orElse("电脑刻录唱片");
        ItemMusicCD.setSongInfo(info, item);
        player.setCurrentTime(0);
        player.markDirty();
    }

    @LuaFunction(mainThread = true)
    public boolean isPlaying(){
        return player.isPlay();
    }

    @LuaFunction(mainThread = true)
    public String idToUrl(long id){
        return String.format("https://music.163.com/song/media/outer/url?id=%d.mp3", id);
    }

    @LuaFunction(mainThread = true)
    public Long urlToId(String url){
        String[] parts = url.split("[?&]id=");
        String idPart;
        if (parts.length > 1) {
            idPart = parts[1].split("&")[0];
        } else {
            return null;
        }
        return Long.parseLong(idPart.replace(".mp3", ""));
    }

    @LuaFunction(mainThread = true)
    public boolean hasCD(){
        return !player.getPlayerInv().getStackInSlot(0).isEmpty();
    }

    @LuaFunction(mainThread = true)
    public void setListIndex(int i) throws LuaException {
        i = i - 1;
        requirePlayList();
        var item = player.getPlayerInv().getStackInSlot(0);
        if(item.isEmpty())throw new LuaException("Music player is empty");
        NetMusicListUtil.setIndex(item, i);
    }

    @LuaFunction(mainThread = true)
    public int getListIndex() throws LuaException {
        requirePlayList();
        var item = player.getPlayerInv().getStackInSlot(0);
        if(item.isEmpty())throw new LuaException("Music player is empty");
        var index = NetMusicListUtil.getIndex(item);
        if(index == -1)throw new LuaException("Not Play List");
        return index + 1;
    }

    @LuaFunction(mainThread = true)
    public int getListCount() throws LuaException {
        requirePlayList();
        var item = player.getPlayerInv().getStackInSlot(0);
        if(item.isEmpty())throw new LuaException("Music player is empty");
        return NetMusicListUtil.getCount(item);
    }

    @LuaFunction(mainThread = true)
    public void setPlayMode(String mode) throws LuaException {
        requirePlayList();
        var item = player.getPlayerInv().getStackInSlot(0);
        if(item.isEmpty())throw new LuaException("Music player is empty");
        NetMusicListUtil.setPlayMode(item, mode);
    }
}

